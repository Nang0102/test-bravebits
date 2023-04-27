// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

// @ts-ignore
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  // @ts-ignore
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
/// Thêm cacsc api ở đây.

app.get("/api/pages", async (req, res) => {
  const id = req.query.id;
  const published_status = req.query.published_status;
  if (id) {
    let pagesData = await shopify.api.rest.Page.find({
      session: res.locals.shopify.session,
      // @ts-ignore
      id,
    });
    res.status(200).send(pagesData);
  } else {
    let pagesData = await shopify.api.rest.Page.all({
      session: res.locals.shopify.session,
      published_status: published_status,
    });
    console.log("pagesData", pagesData);
    res.status(200).send(pagesData);
  }
});

app.put("/api/pages", async (req, res) => {
  // @ts-ignore
  const ids = req.query.id?.split(",");
  const { title, body_html, published } = req.body;

  if (title || body_html) {
    const pageData = new shopify.api.rest.Page({
      session: res.locals.shopify.session,
    });
    pageData.id = ids[0];
    pageData.title = title;
    pageData.published = published;
    pageData.body_html = body_html;
    await pageData.save({
      update: true,
    });
    res.status(200).send(pageData);
  } else if (ids) {
    const updatePageData = ids.map(async (id) => {
      const pageData = new shopify.api.rest.Page({
        session: res.locals.shopify.session,
      });
      pageData.id = id;
      pageData.published = published;

      await pageData.save({ update: true });
    });
    // @ts-ignore
    const pagesData = await Promise.all(updatePageData);
    res.status(200).send(pagesData);
  }
});

app.delete("/api/pages", async (req, res) => {
  // @ts-ignore
  const ids = req.query.id?.split(",");
  const deletePage = ids.map((id) =>
    // @ts-ignore
    shopify.api.rest.Page.delete({
      session: res.locals.shopify.session,
      id: id,
    })
  );
  const deletePagesData = await Promise.all(deletePage);
  res.status(200).send(deletePagesData);
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
