import {
  ChoiceList,
  TextField,
  RangeSlider,
  LegacyCard,
  ResourceList,
  LegacyFilters,
  Avatar,
  Text,
  Button,
  Filters,
  Popover,
  ResourceItem,
  Tabs,
} from "@shopify/polaris";
import {
  FavoriteMajor,
  SortMinor,
  StarOutlineMinor,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { PageItem } from "./PageItem";
import { TextFilter } from "./TextFilter";

export function ResourceListFilters() {
  const [visibleStatus, setVisibleStatus] = useState(null);
  const [queryValue, setQueryValue] = useState(undefined);
  const  [selectedItems,setSelectedItems]=useState([])
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

  function handleTab(){
    const newTabs= [...tabList];
    if(newTabs.length !== 1){
      newTabs.splice(1,1);
      setTabList(newTabs)
      setSelected(0)   
    }
  }
  function  handleMoreTabs(){
    const newTab = {
      id: "customl-search",
      content: "Custom search",
      accessibilityLabel: "Custom search",
      panelID: "customl-search",
    };
    const newTabs = [...tabList, newTab];
    setTabList(newTabs);
    setSelected(1);
  }

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      if(selectedTabIndex===0){
        setQueryValue("");
      const  newTabs= [...tabList]
      newTabs.splice(1)
      setTabList(newTabs)
      setSelected(selectedTabIndex)
      handleVisibleStatusRemove()
      }
    },
    [],
  );

  const handleSaveBtn = useCallback(() => {
    setSaveActive((saveActive) => !saveActive);
  }, []);

  const handleSortBtn = useCallback(() => {
    setSortActive((sortActive) => !sortActive);
  }, []);

  const handleSortChange = useCallback((value) => {
    setIsLoading(true);
    // refetch();
    setSortList(value);
  }, []);

  const handleVisibleStatusChange = useCallback(
    ((value) => {
    setIsLoading(true);
      // setVisibleStatus(value)
      setVisibleStatus(value)
     handleMoreTabs()
    }),[]
  );

  const handleVisibleStatusRemove = useCallback(
    () =>{
      setIsLoading(true)
      setVisibleStatus(null)
      handleTab()
    },
    [tabList]
  );

  const handleFiltersQueryChange = useCallback((value) => {
    setIsLoading(true)
    setQueryValue(value);
    if(tabList.length === 1){
      handleMoreTabs()
      setIsFocus()
    }
    if(value.trim() === ""){
      handleTab()

    }
  }, [queryValue]);

  const handleQueryValueRemove = useCallback(
    () => {setQueryValue(undefined)
      handleTab()
    },
    [tabList]
  );
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
            { label: "Visible", value: "visible" },
            { label: "Hidden", value: "hidden" },
          ]}
          selected={visibleStatus || []}
          onChange={handleVisibleStatusChange}
          allowMultiple
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
    <div style={{ height: "568px" }}>
      <Tabs tabs={tabList} selected={selected} onSelect={handleTabChange}>
      </Tabs>
      <LegacyCard>
        <ResourceList
          resourceName={{ singular: "page", plural: "pages" }}
          filterControl={filterControl}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          items={
             [
              {
                "id": 108828309,
                "title": "Sample Page",
                "shop_id": 548380009,
                "handle": "sample",
                "body_html": "<p>this is a <strong>sample</strong> page.</p>",
                "author": "Dennis",
                "created_at": "2008-07-15T20:00:00-04:00",
                "updated_at": "2008-07-16T20:00:00-04:00",
                "published_at": null,
                "template_suffix": null,
                "admin_graphql_api_id": "gid://shopify/OnlineStorePage/108828309"
              },
              {
                "id": 169524623,
                "title": "Store hours",
                "shop_id": 548380009,
                "handle": "store-hours",
                "body_html": "<p>We never close.</p>",
                "author": "Jobs",
                "created_at": "2013-12-31T19:00:00-05:00",
                "updated_at": "2013-12-31T19:00:00-05:00",
                "published_at": "2014-02-01T19:00:00-05:00",
                "template_suffix": null,
                "admin_graphql_api_id": "gid://shopify/OnlineStorePage/169524623"
              }
            ]
          }
          renderItem={(item) => {
            const { id, title, created_at, body_html, published_at, handle } = item;
             const shortcutActions = handle
            ? [
                {
                  content: "View Page",
                  url: `https://practiceapp222222.myshopify.com/pages/${handle}`,
                },
              ]
            : null;
            return (
              <ResourceItem id={id} shortcutActions={shortcutActions} >
                <PageItem
                body_html={body_html}
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
