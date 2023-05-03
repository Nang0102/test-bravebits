import {
  Page,
  LegacyCard,
  PageActions,
  TextField,
  Collapsible,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { STORE_URL } from "../utilities/constant";

export function SearchEngine() {
  const [openEdit, setOpenEdit] = useState(false);
  const handleToggleEdit = useCallback(
    () => setOpenEdit((openEdit) => !openEdit),
    []
  );
  return (
    <div>
      <LegacyCard>
        <LegacyCard.Section
          sectioned
          title="Search engine listing preview"
          actions={[
            {
              onClick: handleToggleEdit,
              content: !openEdit ? "Edit website SEO" : "",
            },
            ,
          ]}
        >
          <p>
            Add a title and description to see how this Page might appear in a
            search engine listing
          </p>
        </LegacyCard.Section>
        <Collapsible
          open={openEdit}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
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
        </Collapsible>
      </LegacyCard>
    </div>
  );
}
