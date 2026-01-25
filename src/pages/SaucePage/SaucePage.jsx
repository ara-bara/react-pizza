import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { sauceData } from "./SaucePage.data";
import styles from "./SaucePage.module.scss";


const SaucePage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToSauces = () => {
    navigate("/sauces");
  };

  const sauce = sauceData.find((el) => el.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const extractNumber = (value) => {
    return Number(String(value).replace(/\D+/g, ""));
  };

  if (!sauce) return <h2 style={{ color: "white" }}>Соус не знайдено</h2>;

  const sauceInCart = props.orders.find(
    (order) => order.id === `sauce-${sauce.id}`,
  );

  const isInCart = Boolean(sauceInCart);

  const displayQuantity = isInCart ? sauceInCart.quantity : quantity;

  const weight = extractNumber(sauce.weight);

  const sauceWeight = weight * displayQuantity;

  const totalSaucePrice = sauce.price * displayQuantity;

  const similarSauce = sauceData.filter((similar) => similar.id !== sauce.id);

  return (
    <div className="wrapper">
      <Header {...props} />

      <div className={`page-blur ${props.cartOpen ? "blur" : ""}`}>
        <main className="content-area">
          <div className="container">
            <div className={styles.page}>
              <div className={styles.backLink}>
                <button type="button" onClick={goToSauces}>
                  ← До соусів
                </button>
              </div>
              <div className={styles.pageContent}>
                <div>
                  <div className={styles.imageWrapper}>
                    <img
                      src={process.env.PUBLIC_URL + "/img/" + sauce.picture}
                      alt={sauce.title}
                    />
                  </div>
                </div>

                <div className={styles.info}>
                  <h2>{sauce.title}</h2>

                  <div className={styles.price}>{sauce.price} грн</div>
                  <div className={styles.weight}>{sauce.weight}</div>
                  <div className={styles.actions}>
                    <div className={styles.summary}>
                      <div className={styles.summaryPrice}>
                        {totalSaucePrice} грн
                      </div>
                      <div className={styles.summaryWeight}>
                        <span>{sauceWeight} грам</span>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <div className={styles.quantity}>
                        <button
                          className={styles.quantityBtn}
                          onClick={() =>
                            isInCart
                              ? props.onUpdateQuantity(`sauce-${sauce.id}`, -1)
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
                              ? props.onUpdateQuantity(`sauce-${sauce.id}`, 1)
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
                              id: `sauce-${sauce.id}`,
                              title: sauce.title,
                              price: sauce.price,
                              quantity,
                              picture: sauce.picture,
                              type: "sauce",
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
            <div>
              <div className={styles.similarSection}>
                <h2 className={styles.similarTitle}>
                  Вам також може сподобатись
                </h2>

                <div className={styles.similarList}>
                  {similarSauce.slice(0, 4).map((sauce) => (
                    <Link
                      key={sauce.id}
                      to={`/sauce/${sauce.id}`}
                      className={styles.similarLink}
                    >
                      <div className={styles.similarCard}>
                        <div className={styles.imageWrapper}>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/img/" + sauce.picture
                            }
                            alt={sauce.title}
                          />
                        </div>

                        <div className={styles.cardInfo}>
                          <h3 className={styles.cardTitle}>{sauce.title}</h3>

                          <div className={styles.cardMeta}>
                            <span className={styles.price}>
                              {sauce.price} грн
                            </span>
                            <span className={styles.weight}>
                              {sauce.weight}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
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

export default SaucePage;
