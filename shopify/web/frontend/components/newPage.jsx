import {
  Page,
  LegacyCard,
  PageActions,
  TextField,
  Form,
  Layout,
  ChoiceList,
  Button,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { DateSelector } from "./DatePicker";
import PageContent from "./PageContent";
import { SearchEngine } from "./SearchEngine";
import { TimePickerSelector } from "./TimePicker";

export function NewPage() {
  const [value, setValue] = useState("");
  const [visibleStatus, setVisibleStatus] = useState("Visible");

  const handleVisibleChange = useCallback(
    (value) => setVisibleStatus(value),
    []
  );
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  return (
    <Page
      narrowWidth
      breadcrumbs={[{ content: "Orders", url: "#" }]}
      title="Add Page"
    >
      <Form>
        <Layout>
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
          <Layout.Section secondary>
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
          </Layout.Section>
        </Layout>
      </Form>
      <PageActions
        primaryAction={{ content: "Save", disabled: true }}
        secondaryActions={[{ content: "Cancel" }]}
      />
    </Page>
  );
}
