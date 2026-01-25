import { useNavigate } from "react-router-dom";
import styles from "./SauceCard.module.scss";

const SauceCard = ({ sauce }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.sauceCard}
      onClick={() => navigate(`/sauce/${sauce.id}`)}
    >
      <img
        src={process.env.PUBLIC_URL + "/img/" + sauce.picture}
        alt={sauce.title}
      />

      <h3>{sauce.title}</h3>

      <div className={styles.weight}>{sauce.weight} г</div>

      <div className={styles.price}>{sauce.price} грн</div>
    </div>
  );
};

export default SauceCard;
