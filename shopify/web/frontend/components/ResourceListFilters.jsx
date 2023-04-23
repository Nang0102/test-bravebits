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
} from "@shopify/polaris";
import {
  FavoriteMajor,
  SortMinor,
  StarOutlineMinor,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { TextFilter } from "./TextFilter";

export function ResourceListFilters() {
  const [visibleStatus, setVisibleStatus] = useState(undefined);
  const [queryValue, setQueryValue] = useState(undefined);
  const [saveActive, setSaveActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortList, setSortList] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    ((value) => setVisibleStatus(value), [])
  );

  const handleFiltersQueryChange = useCallback((value) => {
    console.log("query value: ", value);
    setQueryValue(value);
  }, []);
  const handleVisibleStatusRemove = useCallback(
    () => setVisibleStatus(undefined),
    []
  );

  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );
  const handleFiltersClearAll = useCallback(() => {
    handleVisibleStatusRemove();
    handleQueryValueRemove();
  }, [handleVisibleStatusRemove, handleQueryValueRemove]);

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
      <LegacyCard>
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          filterControl={filterControl}
          items={[
            {
              id: "341",
              url: "#",
              name: "Mae Jemison",
              location: "Decatur, USA",
            },
            {
              id: "256",
              url: "#",
              name: "Ellen Ochoa",
              location: "Los Angeles, USA",
            },
          ]}
          renderItem={(item) => {
            const { id, url, name, location } = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <Text as="h3" variant="bodyMd" fontWeight="bold">
                  {name}
                </Text>
                <div>{location}</div>
              </ResourceList.Item>
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
