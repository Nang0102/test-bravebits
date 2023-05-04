import {
  ChoiceList,
  LegacyCard,
  ResourceList,
  Button,
  Filters,
  Popover,
  ResourceItem,
  Tabs,
  Spinner,
} from "@shopify/polaris";
import {
  FavoriteMajor,
  SortMinor,
  StarOutlineMinor,
} from "@shopify/polaris-icons";
import { STORE_URL } from "../../utilities/constant";
import { useState, useCallback, useMemo, useEffect } from "react";
import { PageItem } from "./PageItem";
import { EmptyPage } from "../EmptyPage";
import { TextFilter } from "./TextFilter";
import { useAppQuery } from "../../hooks/useAppQuery";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { ToastMessage } from "../Toast";
import { ModalConfirm } from "../ModalConfirm";
import { sortData } from "../../utilities/sortData";

export function ResourceListFilters() {
  const fetch = useAuthenticatedFetch();
  const [dataPages, setDataPages] = useState(undefined);
  const [queryValue, setQueryValue] = useState(undefined);
  const [visibleStatus, setVisibleStatus] = useState(null);
  const [sortActive, setSortActive] = useState(false);
  const [sortList, setSortList] = useState(null);
  const [isEmptyData, setIsEmptyData] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tabList, setTabList] = useState([
    {
      id: "all-customers-1",
      content: "All",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
  ]);
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    contentAction: "",
  });

  const { refetch } = useAppQuery({
    url: `/api/pages?published_status=${visibleStatus}`,
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log("data", data);
        setIsLoading(false);
        if (data.data.length === 0) {
          setIsEmptyData(true);
        } else {
          setIsEmptyData(false);
        }
        let dataRemaining;
        if (queryValue !== "" && queryValue !== undefined) {
          dataRemaining = data.data.filter((page) => {
            return page.title.toLowerCase().includes(queryValue.toLowerCase());
          });
        } else {
          let dataDetail = data.data;
          dataRemaining = [...dataDetail];
        }

        if (sortList) {
          dataRemaining = sortData(dataRemaining, sortList.toString());
        }
        setDataPages(dataRemaining);
        console.log("dataRemain", dataRemaining);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const handleHiddenPages = async (status) => {
    const { published } = status;
    console.log("status", status);
    console.log("selectedItems", selectedItems);
    setIsLoading(true);
    const res = await fetch(`/api/pages?id=${selectedItems.toString()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        published: published,
      }),
    });
    console.log("response", res);

    if (res.ok) {
      setSelectedItems([]);
      refetch();
      setToast({
        ...toast,
        isOpen: true,
        message: ` ${published ? "Visible" : "Hidden"} ${
          selectedItems.length
        } ${selectedItems.length === 1 ? "page" : "pages"}`,
      });
      console.log("toast", toast);
    } else {
      console.log("NOT OK");
    }
  };

  const handleDeletePage = async () => {
    const res = await fetch(`/api/pages?id=${selectedItems.toString()}`, {
      method: "DELETE",
    });

    console.log("resdelete", res);
    if (res.ok) {
      refetch();
      setConfirmModal({
        ...confirmModal,
        isOpen: false,
      });
      setToast({
        ...toast,
        isOpen: true,
        message: `Deleted ${selectedItems.length} ${
          selectedItems.length === 1 ? "page" : "pages"
        }`,
      });
      setSelectedItems([]);
    } else {
      console.log("NOT OK");
    }
  };

  function handleTab() {
    const newTabs = [...tabList];
    if (newTabs.length !== 1) {
      newTabs.splice(1, 1);
      setTabList(newTabs);
      setSelected(0);
    }
  }

  function handleMoreTabs() {
    const newTab = {
      id: "CUSTOM-SEARCH",
      content: "Custom search",
      accessibilityLabel: "Custom search",
      panelID: "CUSTOM-SEARCH",
    };
    const newTabs = [...tabList, newTab];
    setTabList(newTabs);
    setSelected(1);
  }

  const handleTabChange = useCallback((selectedTabIndex) => {
    refetch();
    console.log("selectedTabIndex", selectedTabIndex);
    if (selectedTabIndex === 0) {
      setQueryValue("");
      const newTabs = [...tabList];
      newTabs.splice(1);
      setTabList(newTabs);
      setSelected(selectedTabIndex);
      handleVisibleStatusRemove();
      setIsFocus(false);
    }
  }, []);

  const handleVisibleStatusChange = useCallback((status) => {
    console.log("visible--handlestatusChange", status);
    setIsLoading(true);
    setVisibleStatus(status);
    handleMoreTabs();
  }, []);

  const handleVisibleStatusRemove = useCallback(() => {
    setIsLoading(true);
    setVisibleStatus(null);
    handleTab();
  }, [tabList]);

  const handleFiltersQueryChange = useCallback(
    (value) => {
      setIsLoading(true);
      refetch();
      setQueryValue(value);
      if (tabList.length === 1) {
        handleMoreTabs();
        setIsFocus(true);
      }
      if (value.trim() === "") {
        handleTab();
      }
    },
    [queryValue]
  );

  const handleQueryValueRemove = useCallback(() => {
    refetch();
    setQueryValue(undefined);
    handleTab();
  }, [tabList]);

  const handleFiltersClearAll = useCallback(() => {
    handleVisibleStatusRemove();
    handleQueryValueRemove();
  }, [handleVisibleStatusRemove]);

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => {
        console.log("make visible");
        handleHiddenPages({
          published: true,
        });
      },
    },
    {
      content: "Hide selected pages",
      onAction: () => {
        console.log("make hidden");
        handleHiddenPages({
          published: false,
        });
      },
    },
    {
      content: (
        <Button plain destructive>
          Delete Pages
        </Button>
      ),
      onAction: () =>
        setConfirmModal({
          ...confirmModal,
          isOpen: true,
          title: `Delete ${selectedItems?.length} ${
            selectedItems?.length === 1 ? "page" : "pages"
          }`,
          subTitle:
            "Deleted pages cannot be recovered. Do you still want to continue?",
          contentAction: `Delete ${selectedItems?.length} ${
            selectedItems?.length === 1 ? "page" : "pages"
          }`,
          onConfirm: () => handleDeletePage(),
        }),
    },
  ];

  const [saveActive, setSaveActive] = useState(false);
  const handleSaveBtn = useCallback(() => {
    setSaveActive((saveActive) => !saveActive);
  }, []);

  const saveBtn = (
    <Button
      disabled={visibleStatus || queryValue !== "" ? false : true}
      icon={visibleStatus ? StarOutlineMinor : FavoriteMajor}
      onClick={handleSaveBtn}
      // disclosure
    >
      {visibleStatus || queryValue !== "" ? "Save Filter" : "Saved"}
    </Button>
  );

  const handleSortBtn = useCallback(() => {
    setSortActive((sortActive) => !sortActive);
  }, []);

  const handleSortChange = useCallback((value) => {
    setIsLoading(true);
    refetch();
    setSortList(value);
  }, []);

  const sortBtn = (
    <Button icon={SortMinor} onClick={handleSortBtn} disclosure>
      Sort
    </Button>
  );

  const filters = [
    {
      key: "visible",
      label: "Visibility",
      filter: (
        <ChoiceList
          title="Visibility"
          titleHidden
          choices={[
            { label: "Visible", value: "published" },
            { label: "Hidden", value: "unpublished" },
          ]}
          selected={visibleStatus || []}
          onChange={handleVisibleStatusChange}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (visibleStatus && visibleStatus.length > 0) {
    appliedFilters.push({
      key: "visible",
      label: visibleStatus.map((val) => `Visibility ${val}`).join(", "),
      onRemove: handleVisibleStatusRemove,
    });
  }

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleFiltersClearAll}
      focused={isFocus}
    >
      <div style={{ paddingLeft: "8px", display: "flex", gap: "8px" }}>
        <Popover
          active={saveActive}
          activator={saveBtn}
          autofocusTarget="first-node"
          onClose={handleSaveBtn}
          preferredAlignment="right"
        >
          <Popover.Pane>
            <div>
              <TextFilter
                tagname={visibleStatus}
                handleSaveBtn={handleSaveBtn}
              />
            </div>
          </Popover.Pane>
        </Popover>
        <Popover
          active={sortActive}
          activator={sortBtn}
          autofocusTarget="first-node"
          onClose={handleSortBtn}
          preferredAlignment="right"
        >
          <Popover.Pane>
            <div style={{ padding: "16px" }}>
              <ChoiceList
                title="Sort by"
                choices={[
                  { label: "Newest update", value: "newest" },
                  { label: "Oldest update", value: "oldest" },
                  { label: "Title A-Z", value: "az" },
                  { label: "Title Z-A", value: "za" },
                ]}
                selected={sortList || []}
                onChange={handleSortChange}
                hideClearButton
              />
            </div>
          </Popover.Pane>
        </Popover>
      </div>
    </Filters>
  );

  return (
    <div>
      <LegacyCard>
        {dataPages === undefined ? (
          <div
            style={{
              width: "100%",
              margin: "20px auto",
              textAlign: "center",
            }}
          >
            <Spinner size="large" />
          </div>
        ) : isEmptyData && !visibleStatus ? (
          <EmptyPage />
        ) : (
          <div>
            <Tabs tabs={tabList} selected={selected} onSelect={handleTabChange}>
              <ResourceList
                resourceName={{ singular: "page", plural: "pages" }}
                selectable
                loading={isLoading ? true : false}
                bulkActions={bulkActions}
                filterControl={filterControl}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                items={dataPages}
                renderItem={(item) => {
                  const {
                    id,
                    title,
                    created_at,
                    body_html,
                    published_at,
                    handle,
                  } = item;
                  const shortcutActions = handle
                    ? [
                        {
                          content: "View Page",
                          url: `${STORE_URL}/pages/${handle}`,
                        },
                      ]
                    : null;
                  return (
                    <ResourceItem
                      id={id}
                      shortcutActions={shortcutActions}
                      url={`/${id}`}
                    >
                      <PageItem
                        id={id}
                        body_html={body_html}
                        shortcutActions={shortcutActions}
                        created_at={created_at}
                        visibleStatus={visibleStatus}
                        title={title}
                        published_at={published_at}
                      />
                    </ResourceItem>
                  );
                }}
              />
              {toast.isOpen && (
                <ToastMessage toast={toast} setToast={setToast} />
              )}
              {confirmModal.isOpen && (
                <ModalConfirm
                  confirmModal={confirmModal}
                  setConfirmModal={setConfirmModal}
                />
              )}
            </Tabs>
          </div>
        )}
      </LegacyCard>
    </div>
  );

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
