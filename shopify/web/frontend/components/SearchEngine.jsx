import { Page, LegacyCard, PageActions, TextField } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { STORE_URL } from "../utilities/constant";

export function SearchEngine() {
  return (
    <div>
      <LegacyCard>
        <LegacyCard.Section
          sectioned
          title="Search engine listing preview"
          actions={[{ content: "Edit website SEO" }]}
        >
          <p>
            Add a title and description to see how this Page might appear in a
            search engine listing
          </p>
        </LegacyCard.Section>
        <LegacyCard.Section>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Page title"
              type="text"
              // value={titleSeo}
              // placeholder={titleSeoDefault}
              // onChange={handleChangeTitleSeo}
              // helpText={`${titleSeo.length} of 70 characters used`}
              helpText="0 of 70 characters used"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Description"
              multiline={4}
              // value={parserHTML(descrSeo)}
              // placeholder={descrSeoDefault}
              // onChange={handleChangeDecrSeo}
              // helpText={`${parserHTML(descrSeo).length} of 320 characters used`}
              helpText={`0 of 320 characters used`}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="URL and handle"
              type="text"
              prefix={`${STORE_URL}/pages`}
              // value={urlSeo}
              // onChange={handleChangeUrlSeo}
            />
          </div>
        </LegacyCard.Section>
      </LegacyCard>
    </div>
  );
}
