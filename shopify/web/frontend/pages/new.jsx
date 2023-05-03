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
  Collapsible,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import {
  DateSelector,
  ModalConfirm,
  PageContent,
  SearchEngine,
  TimePickerSelector,
} from "../components";
import { ToastMessage } from "../components/Toast";

export default function NewPage() {
  const [value, setValue] = useState("");
  const [visibleStatus, setVisibleStatus] = useState("Visible");
  const [selected, setSelected] = useState("today");

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    contentAction: "",
  });
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
  });

  const [openDate, setOpenDate] = useState(false);
  const handleToggleDate = useCallback(
    () => setOpenDate((openDate) => !openDate),
    []
  );

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
      // breadcrumbs={[{ content: "Orders", url: "#" }]}
      backAction={{
        onAction: () => {
          // if (title.trim() !== "" || content.trim() !== "") {
          setConfirmModal({
            ...confirmModal,
            isOpen: true,
            title: "You have unsaved changes",
            subTitle:
              "If you leave this page, all unsaved changes will be lost.",
            contentAction: "Leave page",
            onConfirm: () => navigate("/"),
          });
          // } else {
          //   navigate("/");
          // }
        },
      }}
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
                <Collapsible
                  open={openDate}
                  id="basic-collapsible"
                  transition={{
                    duration: "500ms",
                    timingFunction: "ease-in-out",
                  }}
                  expandOnPrint
                >
                  <DateSelector />
                  <TimePickerSelector />
                </Collapsible>
                <div style={{ marginTop: "16px" }}>
                  <Button
                    plain
                    // onClick={() => {
                    //   setIsSetDate(!isSetDate);
                    //   setVisibleStatus(["Hidden"]);
                    // }}
                    onClick={handleToggleDate}
                  >
                    {/* Set visibility date */}
                    {openDate ? "Clear date..." : "Set visibility date"}
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
      {confirmModal.isOpen && (
        <ModalConfirm
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
        />
      )}
      {toast.isOpen && <ToastMessage toast={toast} setToast={setToast} />}
    </Page>
  );
}
