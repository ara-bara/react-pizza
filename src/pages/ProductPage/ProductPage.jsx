import { useState } from "react";
import { useParams } from "react-router-dom";
import SizePicker from "../../components/UI/SizePicker/SizePicker";
import { itemsData } from "../Home/Home.data";
import PizzaConstructor from "../PizzaConstructor/PizzaConstructor";

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
  subtotal, // ПРИЙМАЄМО
  discountAmount, // ПРИЙМАЄМО
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
        // ✅ ПЕРЕДАЄМО НОВІ ПРОПСИ
        subtotal={subtotal}
        discountAmount={discountAmount}
        // ============================
        onCheckout={onCheckout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
      />
    );
  }

  const item = itemsData.find((el) => el.id === numericId);
  if (!item) return <h2>Товар не знайдено</h2>;

  const finalPrice = Math.round(item.price * sizeMultiplier[pizzaSize]);

  return (
    <div style={{ padding: "50px", color: "#fff" }}>
            <h1>{item.title}</h1>
            <SizePicker pizzaSize={pizzaSize} setPizzaSize={setPizzaSize} />
           {" "}
      <img
        src={process.env.PUBLIC_URL + "/img/" + item.img}
        alt={item.title}
        width={300}
      />
            <p>{item.ingredients}</p>      <h2>{finalPrice} грн</h2>   {" "}
    </div>
  );
};

export default ProductPage;
