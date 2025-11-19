import { useEffect, useState } from "react";

export function useFilterSort(items) {
  const [selectedSort, setSelectedSort] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let result = [...items];

    // 🔍 фільтрація
    if (filterText.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // 🔽 сортування
    if (selectedSort) {
      result.sort((a, b) => {
        if (selectedSort === "price" || selectedSort === "weight") {
          return a[selectedSort] - b[selectedSort];
        }
        return a[selectedSort].localeCompare(b[selectedSort]);
      });
    }

    setFilteredItems(result);
  }, [items, filterText, selectedSort]);

  return {
    selectedSort,
    setSelectedSort,
    filterText,
    setFilterText,
    filteredItems,
  };
}
