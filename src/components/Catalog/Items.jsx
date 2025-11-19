import MySelect from "../../UI/select/MySelect";
import { useFilterSort } from "../../hooks/useFilterSort";
import ItemCard from "./ItemCard.jsx";

import styles from "./Items.module.scss";

const Items = ({ items, onAdd, orders, onOpenCart, discount }) => {
  const {
    selectedSort,
    setSelectedSort,
    filterText,
    setFilterText,
    filteredItems,
  } = useFilterSort(items);

  return (
    <main className={styles.main}>
      <form className={styles.filterForm}>
        <input
          type="text"
          placeholder="Знайти..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className={styles.searchInput}
        />

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
            <ItemCard
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
};

export default Items;
