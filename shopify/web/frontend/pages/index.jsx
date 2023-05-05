import { Page } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";
import React from "react";
import { ResourceListFilters, Warning } from "../components";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Page
      fullWidth
      title="Pages"
      primaryAction={{
        content: "Add Page",
        onAction: () => navigate(`/new`),
      }}
    >
      <Warning />
      <div style={{ margin: "10px 0" }}>
        <ResourceListFilters />
      </div>
    </Page>
  );
}
