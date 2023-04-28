import {
  Page,
  LegacyCard,
  PageActions,
  TextField,
  Form,
  Layout,
  ChoiceList,
  Button,
  Select,
  HorizontalGrid,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import {
  DateSelector,
  PageContent,
  SearchEngine,
  TimePickerSelector,
} from "../components";

export default function NewPage() {
  const [value, setValue] = useState("");
  const [visibleStatus, setVisibleStatus] = useState("Visible");
  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Default page", value: "Default page" },
    { label: "contact", value: "contact" },
  ];

  const handleVisibleChange = useCallback(
    (value) => setVisibleStatus(value),
    []
  );
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  return (
    <Page
      // narrowWidth
      breadcrumbs={[{ content: "Orders", url: "#" }]}
      title="Add Page"
    >
      <Form>
        <Layout>
          <HorizontalGrid columns={["twoThirds", "oneThird"]}>
            <Layout.Section>
              <LegacyCard sectioned>
                <TextField
                  label="Title"
                  value={value}
                  onChange={handleChange}
                  placeholder="e.g. Contact us, Sizing Charts,FAQs "
                />
                <PageContent />
              </LegacyCard>
              <div style={{ paddingTop: "15px" }}>
                <SearchEngine />
              </div>
            </Layout.Section>
            <Layout.Section>
              <LegacyCard title="Visible" sectioned>
                <ChoiceList
                  title="Company name"
                  choices={[
                    // { label: "Visible", value: "Visible" },
                    {
                      label:
                        visibleStatus === `Visible`
                          ? `Visible (as of ${new Date().toLocaleDateString()}, ${new Date()
                              .toLocaleTimeString()
                              .slice(0, 4)} ${new Date()
                              .toLocaleTimeString()
                              .slice(-3)} EDT)`
                          : `Visible`,
                      value: "Visible",
                    },
                    { label: "Hidden", value: "Hidden" },
                  ]}
                  selected={visibleStatus}
                  onChange={handleVisibleChange}
                />
                <div>
                  <DateSelector />
                  <TimePickerSelector />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <Button
                    plain
                    // onClick={() => {
                    //   setIsSetDate(!isSetDate);
                    //   setVisibleStatus(["Hidden"]);
                    // }}
                  >
                    Set visibility date
                    {/* {isSetDate ? "Clear date..." : "Set visibility date"} */}
                  </Button>
                </div>
              </LegacyCard>
              <LegacyCard title="Online store" sectioned>
                <Select
                  label="Theme template"
                  options={options}
                  onChange={handleSelectChange}
                  value={selected}
                />
                <p>
                  Assign a template from your current theme to define how the
                  page is displayed.
                </p>
              </LegacyCard>
            </Layout.Section>
          </HorizontalGrid>
        </Layout>
      </Form>

      <PageActions
        primaryAction={{ content: "Save", disabled: true }}
        secondaryActions={[{ content: "Cancel" }]}
      />
    </Page>
  );
}
