import { Layout, Loading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Home } from "../components";

export default function HomePage() {
  return (
    <Home>
      {/* <Loading /> */}
      {/* <Layout>
        <TitleBar
          title="Page name"
          primaryAction={{
            size: "large",
            content: "Add page",
            onAction: () => console.log("Primary action"),
          }}
        />
      </Layout> */}
    </Home>
  );
}
