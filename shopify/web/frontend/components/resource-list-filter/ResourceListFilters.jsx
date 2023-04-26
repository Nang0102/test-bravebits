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

export function ResourceListFilters() {
  const fetch = useAuthenticatedFetch();
  const [visibleStatus, setVisibleStatus] = useState(null);
  const [dataPages, setDataPages] = useState(undefined);
  const [isEmptyData, setIsEmptyData] = useState(true);
  const [queryValue, setQueryValue] = useState(undefined);
  const [selectedItems, setSelectedItems] = useState([]);
  const [saveActive, setSaveActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortList, setSortList] = useState(null);
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

  const appQuery = useAppQuery({
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
            page.title.toLowerCase().includes(queryValue.toLowerCase());
          });
        } else {
          let dataDetail = data.data;
          dataRemaining = [...dataDetail];
        }

        if (sortList) {
          dataRemaining = sortData(dataRemaining, sortList.toString());
        }
        console.log("dataRemain", dataRemaining);
        setDataPages(dataRemaining);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });
  const refetch = appQuery.refetch;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/pages?published_status=${visibleStatus}`
      );
      const data = await response.json();
      setDataPages(data.data);
    };
    fetchData();
  }, [visibleStatus]);

  const handleHiddenPage = () => {};

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
    if (selectedTabIndex === 0) {
      setQueryValue("");
      const newTabs = [...tabList];
      newTabs.splice(1);
      setTabList(newTabs);
      setSelected(selectedTabIndex);
      handleVisibleStatusRemove();
    }
  }, []);

  const handleSaveBtn = useCallback(() => {
    setSaveActive((saveActive) => !saveActive);
  }, []);

  const handleSortBtn = useCallback(() => {
    setSortActive((sortActive) => !sortActive);
  }, []);

  const handleSortChange = useCallback((value) => {
    setIsLoading(true);
    setSortList(value);
  }, []);

  const handleVisibleStatusChange = useCallback(
    (status) => {
      console.log("visible", status);
      setIsLoading(true);
      setVisibleStatus(status);
      let filterData;
      if (status === "visible") {
        filterData = dataPages.filter((page) => {
          console.log("visible1111", page.published_at);
          page.published_at && page.published_at !== null;
        });
      } else {
        filterData = dataPages.filter((page) => {
          console.log("hidden", page.published_at);

          !page.published_at || page.published_at === null;
        });
      }
      setDataPages(filterData);
      handleMoreTabs();
    },
    [dataPages]
  );
  // const handleVisibleStatusChange = useCallback((status) => {
  //   setVisibleStatus(status);
  // }, []);

  // const filteredPages = useMemo(() => {
  //   if (!dataPages) {
  //     return [];
  //   }
  //   return
  // }, [dataPages, visibleStatus]);

  const handleVisibleStatusRemove = useCallback(() => {
    setIsLoading(true);
    setVisibleStatus(null);
    handleTab();
  }, [tabList]);

  const handleFiltersQueryChange = useCallback(
    (value) => {
      console.log("value", value);
      setIsLoading(true);
      setQueryValue(!value);
      if (tabList.length === 1) {
        handleMoreTabs();
        setIsFocus();
      }
      if (value.trim() === "") {
        handleTab();
      }
    },
    [queryValue]
  );

  const handleQueryValueRemove = useCallback(() => {
    setQueryValue(undefined);
    handleTab();
  }, [tabList]);
  const handleFiltersClearAll = useCallback(() => {
    handleVisibleStatusRemove();
    handleQueryValueRemove();
  }, [handleVisibleStatusRemove]);

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
            { label: "Visible", value: "Visible" },
            { label: "Hidden", value: "Hidden" },
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
            <LegacyCard>
              <ResourceList
                resourceName={{ singular: "page", plural: "pages" }}
                // loading={isLoading ? true : false}
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
                          url: `{${STORE_URL}/pages/${handle}`,
                        },
                      ]
                    : null;
                  return (
                    <ResourceItem id={id} shortcutActions={shortcutActions}>
                      <PageItem
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
            </LegacyCard>
          </Tabs>
        </div>
      )}
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
