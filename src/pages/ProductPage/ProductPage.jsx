import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BackLink from "../../components/UI/BackLink/BackLink";
import backStyles from "../../components/UI/BackLink/BackLink.module.scss";
import SizePicker from "../../components/UI/SizePicker/SizePicker";
import PizzaConstructor from "../PizzaConstructor/PizzaConstructor";
import { itemsData } from "../Home/Home.data";
import doneIcon from "../../assets/icons/done-icon.svg";
import styles from "./ProductPage.module.scss";

const sizeMultiplier = { 30: 1, 40: 1.2, 50: 1.4 };

const ProductPage = ({
  addToOrder,
  orders,
  onDelete,
  onUpdateQuantity,
  totalItems,
  totalPrice,
  subtotal,
  discountAmount,
  onCheckout,
  onOpenCart,
  onCloseCart,
  cartOpen,
}) => {
  const { id } = useParams();
  const numericId = Number(id);

  const [pizzaSize, setPizzaSize] = useState("30");

  const item = itemsData.find((el) => el.id === numericId);

  useEffect(() => {
    if (!item || numericId === 12) return;

    const recent = JSON.parse(localStorage.getItem("recentPizzas")) || [];

    const updatedRecent = [
      item,
      ...recent.filter((pizza) => pizza.id !== item.id),
    ].slice(0, 6);

    localStorage.setItem("recentPizzas", JSON.stringify(updatedRecent));
  }, [item, numericId]);

  if (numericId === 12) {
    return (
      <PizzaConstructor
        addToOrder={addToOrder}
        orders={orders}
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onCheckout={onCheckout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
      />
    );
  }

  if (!item) return <h2 style={{ color: "white" }}>Товар не знайдено</h2>;

  const finalPrice = Math.round(item.price * sizeMultiplier[pizzaSize]);
  const itemInCart = orders.find((o) => o.id === item.id);
  const isInCart = Boolean(itemInCart);

  const handleAdd = () => {
    addToOrder({
      ...item,
      price: finalPrice,
      quantity: 1,
      type: "default",
    });
  };

  return (
    <div className="wrapper">
      <Header
        orders={orders}
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onCheckout={onCheckout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
      />

      <div className={`page-blur ${cartOpen ? "blur" : ""}`}>
        <main className={`content-area ${cartOpen ? "blur" : ""}`}>
          <div className={styles.container}>
            <BackLink
              to="/"
              state={{ scrollTo: "items" }}
              className={backStyles.backLink}
            >
              ← До піц
            </BackLink>

            <div className={styles.hero}>
              <div className={styles.media}>
                <div className={styles.mediaFrame}>
                  <img
                    className={styles.image}
                    src={process.env.PUBLIC_URL + "/img/" + item.img}
                    alt={item.title}
                    loading="eager"
                  />
                </div>
              </div>

              <div className={styles.meta}>
                <h1 className={styles.title}>{item.title}</h1>

                <div className={styles.block}>
                  <div className={styles.blockLabel}>Розмір</div>
                  <SizePicker
                    pizzaSize={pizzaSize}
                    setPizzaSize={setPizzaSize}
                  />
                </div>

                <div className={styles.block}>
                  <div className={styles.blockLabel}>Склад</div>
                  <p className={styles.ingredients}>{item.ingredients}</p>
                </div>

                <div className={styles.payRow}>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>До сплати</div>
                    <div className={styles.priceValue}>{finalPrice} грн</div>
                  </div>

                  {isInCart ? (
                    <button
                      type="button"
                      className={styles.inCartBtn}
                      onClick={onOpenCart}
                    >
                      <img src={doneIcon} alt="" />В кошику:{" "}
                      {itemInCart.quantity} • Перейти
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.addBtn}
                      onClick={handleAdd}
                    >
                      Додати в кошик
                    </button>
                  )}
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

export default ProductPage;
