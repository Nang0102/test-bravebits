import { Page } from "@shopify/polaris";
import { Warning } from "./Warning";
import React from "react";
import { ResourceListFilters } from "./resource-list-filter/ResourceListFilters";
// import PageContent from "./PageContent";
// import { NewPage } from "./newPage";

export function Home() {
  return (
    <Page
      fullWidth
      title="Pages"
      primaryAction={{ content: "Add Page", onAction: () => navigate("/new") }}
    >
      <Warning />
      <div style={{ margin: "10px 0" }}>
        <ResourceListFilters />
        {/* <PageContent/> */}
      </div>
    </Page>
    // <NewPage />
  );
}
