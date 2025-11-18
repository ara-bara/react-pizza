import { useEffect, useState } from "react";
import Item from "./Item";
import styles from "./Items.module.scss";
import MySelect from "./UI/select/MySelect";

function Items({ items, onAdd, orders, onOpenCart, discount }) {
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

    // 📊 сортування
    if (selectedSort) {
      result.sort((a, b) => {
        if (selectedSort === "price" || selectedSort === "weight") {
          return a[selectedSort] - b[selectedSort];
        } else {
          return a[selectedSort].localeCompare(b[selectedSort]);
        }
      });
    }

    setFilteredItems(result);
  }, [items, filterText, selectedSort]);

  return (
    <main className={styles.main}>
      <form className={styles.filterForm}>
        {/* 🧠 Input для пошуку */}
        <input
          type="text"
          placeholder="Знайти..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className={styles.searchInput}
        />

        {/* 🔽 Select для сортування */}
        <MySelect
          value={selectedSort}
          onChange={(sort) => setSelectedSort(sort)}
          defaultvalue="Сортування"
          options={[
            { value: "title", name: "По назві" },
            { value: "price", name: "По ціні" },
            { value: "weight", name: "По вазі" },
          ]}
          className={styles.searchSelect}
        />
      </form>

      <div className={styles.containerCustom}>
        {filteredItems.length > 0 ? (
          filteredItems.map((el) => (
            <Item
              key={el.id}
              item={el}
              onAdd={onAdd}
              orders={orders}
              onOpenCart={onOpenCart}
              discount={discount}
            />
          ))
        ) : (
          <p className={styles.noResults}>Нічого не знайдено 😕</p>
        )}
      </div>
    </main>
  );
}

export default Items;
