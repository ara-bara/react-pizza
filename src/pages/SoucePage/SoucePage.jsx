import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { souceData } from "./SoucePage.data";
import styles from "./SoucePage.module.scss";

const SoucePage = (props) => {
  const { id } = useParams();
  const souce = souceData.find((el) => el.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!souce) return <h2 style={{ color: "white" }}>Соус не знайдено</h2>;

  return (
    <div className="wrapper">
      <Header {...props} />

      <div className={`page-blur ${props.cartOpen ? "blur" : ""}`}>
        <main className="content-area">
          <div className="container">
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
                <div className={styles.weight}>{souce.weight}</div>

                <div className={styles.buttons}>
                  <div className={styles.quantity}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>

                    <span className={styles.quantityValue}>{quantity}</span>

                    <button
                      className={styles.quantityBtn}
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.btn}
                    onClick={() =>
                      props.addToOrder({
                        id: `souce-${souce.id}`,
                        title: souce.title,
                        price: souce.price,
                        quantity,
                        picture: souce.picture,
                      })
                    }
                  >
                    Додати в кошик
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SoucePage;
