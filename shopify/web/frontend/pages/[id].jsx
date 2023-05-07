import { useParams } from "react-router-dom";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useAppQuery } from "../hooks";
import { STORE_URL } from "../utilities/constant";

import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import {
  Badge,
  Button,
  ChoiceList,
  HorizontalGrid,
  Layout,
  LegacyCard,
  Page,
  PageActions,
  Select,
  TextField,
  Collapsible,
} from "@shopify/polaris";

import { ViewMajor, DuplicateMinor } from "@shopify/polaris-icons";
import {
  PageContent,
  DateSelector,
  TimePickerSelector,
  ModalConfirm,
  SearchEngine,
  Skeleton,
  ToastMessage,
} from "../components";

export default function PageEdit() {
  const fetch = useAuthenticatedFetch();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    contentAction: "",
  });

  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [initData, setInitData] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("today");
  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleContentChange = useCallback((value) => {
    console.log("value content", value);
    setContent(value);
  }, []);
  console.log("editorRef----", editorRef.current);
  const [visibleStatus, setVisibleStatus] = useState(["Visible"]);
  const [initVisible, setInitVisible] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
  });
  const handleToggleDate = useCallback(
    () => setOpenDate((openDate) => !openDate),
    []
  );

  const { data, refetch } = useAppQuery({
    url: `/api/pages?id=${id}`,
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log("get data", data);
        setInitData(data);
        setTitle(data.title);
        setContent(data.body_html);
        setVisibleStatus(data.published_at ? ["Visible"] : ["Hidden"]);
        setInitVisible(data.published_at ? ["Visible"] : ["Hidden"]);
        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const options = [
    { label: "Default", value: "today" },
    { label: "contact", value: "contact" },
  ];

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleVisibleChange = useCallback(
    (value) => setVisibleStatus(value),
    []
  );

  const handleUpdatePage = () => {
    console.log("cpntentApi===", content);
    const updatedData = {
      title: title,
      body_html: content,
      published: visibleStatus?.toString() !== "Visible" ? null : true,
    };
    setLoadingUpdate(true);
    console.log("updateData", updatedData);
    fetch(`/api/pages?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("OK");
        refetch();
        console.log("data----update", data);
        setLoadingUpdate(false);
        setToast({
          ...toast,
          isOpen: true,
          message: "Page was saved",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePage = async () => {
    const res = await fetch(`/api/pages?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("OK");
      setConfirmModal({
        ...confirmModal,
        loading: false,
      });
      setToast({
        ...toast,
        isOpen: true,
        message: "Deleted 1 page",
      });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      console.log("NOT OK");
    }
  };

  const handleClickBtnDelete = () =>
    setConfirmModal({
      ...confirmModal,
      isOpen: true,
      title: `Delete ${title}`,
      subTitle: `Delete "${title}"? This
    can't be undone.`,
      contentAction: "Delete ",
      onConfirm: () => handleDeletePage(),
    });
  if (isLoading) return <Skeleton />;

  const handleLeavePage = () => {
    if (title.trim() !== "" || content.trim() !== "") {
      setConfirmModal({
        ...confirmModal,
        isOpen: true,
        title: "You have unsaved changes",
        subTitle: "If you leave this page, all unsaved changes will be lost.",
        contentAction: "Leave page",
        onConfirm: () => navigate("/"),
      });
    } else {
      navigate("/");
    }
  };
  return (
    <Page
      backAction={{
        onAction: handleLeavePage,
      }}
      title={data && data.title}
      titleMetadata={data && data.published_at ? null : <Badge>Hidden</Badge>}
      secondaryActions={[
        { content: "Duplicate", icon: DuplicateMinor },
        {
          content: "Preview page",
          icon: ViewMajor,
          onAction: () => {
            console.log("navigate");
            navigate(`${STORE_URL}/pages/${initData.handle}`);
          },
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
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
            <SearchEngine title={title} content={content} initData={initData} />
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="Visible" sectioned>
            <ChoiceList
              title="Company name"
              choices={[
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
          disabled:
            title.trim() !== initData.title ||
            initVisible.toString() !== visibleStatus.toString()
              ? false
              : true,
          loading: loadingUpdate,
          onClick: handleUpdatePage,
        }}
        secondaryActions={[
          {
            content: "Delete page",
            onClick: handleClickBtnDelete,
            destructive: true,
            outline: true,
          },
        ]}
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
