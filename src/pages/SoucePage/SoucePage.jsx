import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { souceData } from "./SoucePage.data";
import styles from "./SoucePage.module.scss";

const SoucePage = (props) => {
  const { id } = useParams();
  const souce = souceData.find((el) => el.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const extractNumber = (value) => {
    return Number(String(value).replace(/\D+/g, ""));
  };

  if (!souce) return <h2 style={{ color: "white" }}>Соус не знайдено</h2>;

  const souceInCart = props.orders.find(
    (order) => order.id === `souce-${souce.id}`
  );

  const isInCart = Boolean(souceInCart);

  const displayQuantity = isInCart ? souceInCart.quantity : quantity;
  
  const weight = extractNumber(souce.weight);

  const souceWeight = weight * displayQuantity;

  const totalSoucePrice = souce.price * displayQuantity;

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
                <div className={styles.actions}>
                  <div className={styles.summary}>
                    <div className={styles.summaryPrice}>
                      {totalSoucePrice} грн
                    </div>
                    <div className={styles.summaryWeight}>
                      <span>{souceWeight} грам</span>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <div className={styles.quantity}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() =>
                          isInCart
                            ? props.onUpdateQuantity(`souce-${souce.id}`, -1)
                            : setQuantity((q) => Math.max(1, q - 1))
                        }
                      >
                        −
                      </button>

                      <span className={styles.quantityValue}>
                        {displayQuantity}
                      </span>

                      <button
                        className={styles.quantityBtn}
                        onClick={() =>
                          isInCart
                            ? props.onUpdateQuantity(`souce-${souce.id}`, 1)
                            : setQuantity((q) => q + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    {isInCart ? (
                      <button
                        onClick={props.onOpenCart}
                        className={styles.inCartBtn}
                      >
                        Перейти до кошику
                      </button>
                    ) : (
                      <button
                        className={styles.addToCartBtn}
                        onClick={() =>
                          props.addToOrder({
                            id: `souce-${souce.id}`,
                            title: souce.title,
                            price: souce.price,
                            quantity,
                            picture: souce.picture,
                            type: "souce",
                          })
                        }
                      >
                        Додати в кошик
                      </button>
                    )}
                  </div>
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
