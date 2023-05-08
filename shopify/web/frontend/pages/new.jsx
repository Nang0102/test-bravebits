import {
  Page,
  LegacyCard,
  PageActions,
  TextField,
  Layout,
  ChoiceList,
  Button,
  Select,
  HorizontalGrid,
  Collapsible,
  Banner,
} from "@shopify/polaris";
import React, { useState, useCallback, useRef } from "react";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import {
  DateSelector,
  ModalConfirm,
  PageContent,
  SearchEngine,
  TimePickerSelector,
} from "../components";
import { ToastMessage } from "../components/Toast";

export default function NewPage() {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [visibleStatus, setVisibleStatus] = useState("Visible");
  const [selected, setSelected] = useState("today");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  const handleTitleChange = useCallback((newValue) => {
    setTitle(newValue);
  }, []);
  const handleContentChange = useCallback((value) => setContent(value), []);

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

  //   const getSpanEl = (data) => {
  //   const regexSpan =
  //     /<div[^>]*contenteditable=["']true["'][^>]*>(.*?)<\/div>/i;
  //   console.log("aaa", regexSpan.exec(data)[1]);

  //   return regexSpan.exec(data)[1];
  // };

  const handleCreatePage = () => {
    console.log("create page");
    if (title.trim() === "") {
      setIsError(true);
    } else {
      setLoading(true);
      const newPage = {
        title: title,
        body_html: editorRef.current.innerHTML,
        published: visibleStatus?.toString() !== "Visible" ? null : true,
      };

      console.log(newPage);
      fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: newPage,
        }),
      })
        .then((res) => {
          console.log("res create page", res);
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setToast({
            ...toast,
            isOpen: true,
            message: "Page was created",
          });
          setTimeout(() => {
            console.log("navigate home page");
            navigate("/");
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLeavePage = () => {
    if (title.trim() !== "" || content.trim() !== "") {
      console.log("itl", title);
      setConfirmModal({
        ...confirmModal,
        isOpen: true,
        title: "You have unsaved changes",
        subTitle: "If you leave this page, all unsaved changes will be lost.",
        contentAction: "Leave page",
        onConfirm: () => navigate("/"),
      });
    } else {
      console.log("empty");
      navigate("/");
    }
  };
  return (
    <Page
      backAction={{
        onAction: handleLeavePage,
      }}
      title="Add Page"
    >
      {isError && (
        <div style={{ marginBottom: "16px" }}>
          <Banner title="There is 1 error:" status="critical">
            <li>Title can't be blank</li>
          </Banner>
        </div>
      )}
      <HorizontalGrid columns={["twoThirds", "oneThird"]}>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Contact us, Sizing Charts,FAQs "
            />
            <PageContent
              handleContentChange={handleContentChange}
              content={content}
              editorRef={editorRef}
            />
          </LegacyCard>
          <div style={{ paddingTop: "15px" }}>
            <SearchEngine title={title} content={content} />
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="Visible" sectioned>
            <ChoiceList
              title="Company name"
              choices={[
                {
                  label:
                    visibleStatus.toString() === `Visible`
                      ? `Visible (as of ${new Date().toLocaleDateString()}, ${new Date()
                          .toLocaleTimeString()
                          .slice(0, 5)} ${new Date()
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
              <Button plain onClick={handleToggleDate}>
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
              Assign a template from your current theme to define how the page
              is displayed.
            </p>
          </LegacyCard>
        </Layout.Section>
      </HorizontalGrid>
      <div style={{ margin: "20px 0px" }}></div>

      <PageActions
        primaryAction={{
          content: "Save",
          disabled: title.trim() !== "" || content.trim() !== "" ? false : true,
          loading: loading,
          onClick: handleCreatePage,
        }}
        secondaryActions={[{ content: "Cancel", onClick: handleLeavePage }]}
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
