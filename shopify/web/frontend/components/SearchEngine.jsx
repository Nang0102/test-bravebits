import { LegacyCard, TextField, Collapsible, Text } from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import { STORE_URL } from "../utilities/constant";
import { parserHTML } from "../utilities/parseHTML";

export function SearchEngine({ title, content = "" }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [titleSeo, setTitleSeo] = useState(title);
  const [description, setDescription] = useState(content);
  const [titleSeoDefault, setTitleSeoDefault] = useState(title);
  const [descrSeoDefault, setDecrDefault] = useState(content);
  const [handleSeo, setHandleSeo] = useState("");

  useEffect(() => {
    setTitleSeoDefault(title);
    setDecrDefault(content);
  }, [title, content]);
  const handleToggleEdit = useCallback(
    () => setOpenEdit((openEdit) => !openEdit),
    []
  );
  const handleChangeTitleSeo = useCallback((value) => {
    setTitleSeo(value);
  }, []);

  const handleChangeDescription = useCallback((value) => {
    setDescription(value);
  }, []);

  const handleChangeUrlSeo = useCallback((value) => {
    setHandleSeo(value);
  }, []);
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
          {titleSeo !== "" && parserHTML(description) !== "" ? (
            <div>
              <p style={{ fontSize: "18px", color: "#1a0dab" }}>{titleSeo}</p>
              <Text color="success">{`${STORE_URL}/pages/${titleSeo}`}</Text>
              <p>{parserHTML(description)}</p>
            </div>
          ) : titleSeo.trim() === "" &&
            parserHTML(description).trim() === "" &&
            title.trim() !== "" &&
            content.trim() !== "" ? (
            <div>
              <p style={{ fontSize: "18px", color: "#1a0dab" }}>{title}</p>
              <Text color="success">{`${STORE_URL}/pages/${title}`}</Text>
              <p>{content}</p>
            </div>
          ) : (
            <p>
              Add a title and description to see how this Page might appear in a
              search engine listing
            </p>
          )}
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
                value={titleSeo}
                placeholder={titleSeoDefault}
                onChange={handleChangeTitleSeo}
                helpText={`${titleSeo.length} of 70 characters used`}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TextField
                label="Description"
                multiline={4}
                value={parserHTML(description)}
                placeholder={descrSeoDefault}
                onChange={handleChangeDescription}
                helpText={`${
                  parserHTML(description).length
                } of 320 characters used`}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TextField
                label="URL and handle"
                type="text"
                prefix={`${STORE_URL}/pages`}
                value={handleSeo}
                onChange={handleChangeUrlSeo}
              />
            </div>
          </LegacyCard.Section>
        </Collapsible>
      </LegacyCard>
    </div>
  );
}
