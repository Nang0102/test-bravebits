import { Page } from "@shopify/polaris";
import { Warning } from "./Warning";
import React from "react";
import { ResourceListFilters } from "./ResourceListFilters";

export function Home() {
  return (
    <Page fullWidth title="Pages" primaryAction={{ content: "Add Page" }}>
      <Warning />
      <div style={{ margin: "16px 0" }}>
        <ResourceListFilters />
      </div>
    </Page>
  );
}
