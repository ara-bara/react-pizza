import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { souceData } from "./SoucePage.data";
import styles from "./SoucePage.module.scss";


const SoucePage = (props) => {
  const { id } = useParams();
  const souce = souceData.find((el) => el.id === Number(id));

  if (!souce) return <h2 style={{ color: "white" }}>Соус не знайдено</h2>;

  return (
    <div className="wrapper">
      <Header {...props} />

      <main className={`content-area ${props.cartOpen ? "blur" : ""}`}>
        <div className={styles.page}>
          <div className={styles.imageWrapper}>
            <img
              src={process.env.PUBLIC_URL + "/img/" + souce.picture}
              alt={souce.title}
            />
          </div>

          <div className={styles.info}>
            <h2>{souce.title}</h2>
            <div className={styles.price}>{souce.price} грн</div>
            <div className={styles.weight}>{souce.weight} г</div>

            <button
              className={styles.btn}
              onClick={() =>
                props.addToOrder({
                  id: `souce-${souce.id}`,
                  title: souce.title,
                  price: souce.price,
                  quantity: 1,
                  img: souce.picture,
                })
              }
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SoucePage;
