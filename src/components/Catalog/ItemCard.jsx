import { Link } from "react-router-dom";
import doneIcon from "../../assets/icons/done-icon.svg";
import styles from "./ItemCard.module.scss";

const ItemCard = ({ item, orders, onAdd, onOpenCart, discount }) => {
  const itemInCart = orders.find((order) => order.id === item.id);
  const isInCart = Boolean(itemInCart);

  const handleAddToCart = (e) => {
    e.preventDefault();

    onAdd({
      ...item,
      quantity: 1,
      type: item.id === 12 ? "constructor" : "default",
    });
  };

  const handleOpenCart = (e) => {
    e.preventDefault();
    onOpenCart();
  };

  return (
    <Link
      to={`/product/${item.id}`}
      className={`${styles.item} ${styles[`item-${item.id}`]}`}
    >
      <div className={styles.itemImage}>
        <img
          src={`${process.env.PUBLIC_URL}/img/${item.picture}`}
          alt={item.title}
        />
      </div>

      <div className={styles.itemContent}>
        <h3 className={styles.itemTitle}>{item.title}</h3>

        <p className={styles.itemDescription}>
          <span className={styles.itemWeight}>{item.weight}</span>
          <span className={styles.itemIngredients}> - {item.ingredients}</span>
        </p>
      </div>

      <div className={styles.cardFooter}>
        {isInCart ? (
          <button
            type="button"
            className={`${styles.cardButton} ${styles.buttonInCart}`}
            onClick={handleOpenCart}
          >
            <img src={doneIcon} alt="" className={styles.doneIcon} />

            <span className={styles.cartText}>
              <span>В кошику</span>
              <span className={styles.dot}>·</span>
              <span>{itemInCart.quantity} шт</span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.cardButton} ${styles.buttonDefault}`}
            onClick={handleAddToCart}
          >
            <span className={styles.price}>{item.price} грн</span>
            <span className={styles.hoverText}>Додати в кошик</span>
          </button>
        )}
      </div>
    </Link>
  );
};

export default ItemCard;
