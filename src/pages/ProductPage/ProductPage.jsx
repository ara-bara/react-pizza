import { useState } from "react";
import { useParams } from "react-router-dom";
import SizePicker from "../../components/UI/SizePicker/SizePicker";
import { itemsData } from "../Home/Home.data";
import PizzaConstructor from "../PizzaConstructor/PizzaConstructor";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const sizeMultiplier = {
  30: 1,
  40: 1.2,
  50: 1.4,
};

const ProductPage = ({
  addToOrder,
  orders,
  onDelete,
  onUpdateQuantity,
  totalItems,
  totalPrice,
  subtotal,
  discountAmount,
  discount,
  onCheckout,
  onOpenCart,
  onCloseCart,
  cartOpen,
}) => {
  const { id } = useParams();
  const numericId = Number(id);

  const [pizzaSize, setPizzaSize] = useState("30");

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

  const item = itemsData.find((el) => el.id === numericId);
  if (!item) return <h2 style={{ color: "white" }}>Товар не знайдено</h2>;

  const finalPrice = Math.round(item.price * sizeMultiplier[pizzaSize]);

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
          <div
            style={{
              padding: "60px 20px",
              color: "#fff",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <h1>{item.title}</h1>

            <SizePicker pizzaSize={pizzaSize} setPizzaSize={setPizzaSize} />

            <img
              src={process.env.PUBLIC_URL + "/img/" + item.img}
              alt={item.title}
              width={300}
              style={{ display: "block", margin: "20px 0" }}
            />

            <p>{item.ingredients}</p>

            <h2 style={{ marginTop: "20px" }}>{finalPrice} грн</h2>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
