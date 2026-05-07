import { useNavigate } from "react-router-dom";
import styles from "./SauceCard.module.scss";

const SauceCard = ({ sauce, addToOrder, orders, onOpenCart }) => {
  const navigate = useNavigate();

  const sauceId = `sauce-${sauce.id}`;

  const sauceInCart = orders?.find((order) => order.id === sauceId);
  const isInCart = Boolean(sauceInCart);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isInCart) {
      onOpenCart();
      return;
    }

    addToOrder({
      id: sauceId,
      title: sauce.title,
      price: sauce.price,
      quantity: 1,
      picture: sauce.picture,
      type: "sauce",
    });
  };

  return (
    <article
      className={styles.sauceCard}
      onClick={() => navigate(`/sauce/${sauce.id}`)}
    >
      <div className={styles.imageBox}>
        <img
          src={process.env.PUBLIC_URL + "/img/" + sauce.picture}
          alt={sauce.title}
        />
      </div>

      <div className={styles.info}>
        <h3>{sauce.title}</h3>
        <p>{sauce.weight} г</p>
      </div>

      <div className={styles.bottom}>
        <strong>{sauce.price} грн</strong>

        <button
          type="button"
          onClick={handleAddToCart}
          className={isInCart ? styles.inCartBtn : ""}
        >
          🛒 {isInCart ? "В кошику" : "Додати"}
        </button>
      </div>
    </article>
  );
};

export default SauceCard;
