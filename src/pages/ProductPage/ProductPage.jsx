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
  onCheckout,
  onOpenCart,
  onCloseCart,
  cartOpen,
  discount,
}) => {
  const { id } = useParams();
  const numericId = Number(id);

  // ❗ ХУКИ ТУТ — ЗАВЖДИ, БЕЗ IF !!!
  const [pizzaSize, setPizzaSize] = useState("30");

  // якщо сторінка — конструктор
  if (Number(id) === 12) {
    return (
      <PizzaConstructor
        addToOrder={addToOrder}
        orders={orders}
        // ПЕРЕДАЧА ВСІХ ПРОПСІВ У КОНСТРУКТОР
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
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

      <img
        src={process.env.PUBLIC_URL + "/img/" + item.img}
        alt={item.title}
        width={300}
      />

      <p>{item.ingredients}</p>
      <h2>{finalPrice} грн</h2>
    </div>
  );
};

export default ProductPage;
