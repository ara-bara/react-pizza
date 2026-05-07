import { Link } from "react-router-dom";
import styles from "./RecentlyViewed.module.scss";

const RecentlyViewed = () => {
  const recent = JSON.parse(localStorage.getItem("recentPizzas")) || [];

  if (recent.length === 0) return null;

  return (
    <section className={styles.recent}>
      <div className={styles.header}>
        <h2>Нещодавно переглянуті</h2>
        <p>Повернись до піц, які ти вже дивився</p>
      </div>

      <div className={styles.list}>
        {recent.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className={styles.card}
          >
            <img
              src={`${process.env.PUBLIC_URL}/img/${item.picture}`}
              alt={item.title}
            />

            <div>
              <h3>{item.title}</h3>
              <span>{item.price} грн</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
