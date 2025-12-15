import { Link } from "react-router-dom";
import doneIcon from "../../assets/icons/done-icon.svg";
import styles from "./ItemCard.module.scss";

const ItemCard = ({ item, orders, onAdd, onOpenCart, discount }) => {
  const isInCart = orders.some((order) => order.id === item.id);
  const itemInCart = orders.find((order) => order.id === item.id);

  const totalPriceForItem = itemInCart
    ? itemInCart.price * itemInCart.quantity
    : 0;

  const finalPrice = totalPriceForItem * (1 - discount);

  return (
    <Link
      to={`/product/${item.id}`}
      className={`${styles.item} ${styles[`item-${item.id}`]}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/img/${item.picture}`}
        alt={item.title}
      />

      <div className={styles.itemTitle}>{item.title}</div>

      <div className={styles.itemDescription}>
        <span className={styles.itemWeight}>{item.weight}</span>
        <span className={styles.itemIngredients}>{item.ingredients}</span>
      </div>

      <div className={styles.priceContainer}>
        {isInCart ? (
          <div
            className={styles.inCart}
            onClick={(e) => {
              e.preventDefault();
              onOpenCart();
            }}
          >
            <img src={doneIcon} alt="Done" className={styles.doneIcon} />В
            кошику <span>{itemInCart.quantity}</span> шт за{" "}
            <span>{finalPrice.toFixed(0)}</span> грн
          </div>
        ) : (
          <>
            <h2 className={styles.itemPrice}>{item.price} грн</h2>
            <h2
              className={styles.addToCart}
              onClick={(e) => {
                e.preventDefault();
                onAdd(item);
              }}
            >
              Додати в кошик
            </h2>
          </>
        )}
      </div>
    </Link>
  );
};

export default ItemCard;
