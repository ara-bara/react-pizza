import { useNavigate } from "react-router-dom";
import styles from "./SouceCard.module.scss";

const SouceCard = ({ souce }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.souceCard}
      onClick={() => navigate(`/souce/${souce.id}`)}
    >
      <img
        src={process.env.PUBLIC_URL + "/img/" + souce.picture}
        alt={souce.title}
      />

      <h3>{souce.title}</h3>

      <div className={styles.weight}>{souce.weight} г</div>

      <div className={styles.price}>{souce.price} грн</div>
    </div>
  );
};

export default SouceCard;
