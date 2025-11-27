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

const ProductPage = () => {
  const { id } = useParams();

  // 🔥 state має бути тут, всередині компонента
  const [pizzaSize, setPizzaSize] = useState("30");

  if (Number(id) === 12) {
    return <PizzaConstructor />;
  }

  const item = itemsData.find((el) => el.id === Number(id));

  const finalPrice = Math.round(item.price * sizeMultiplier[pizzaSize]);

  if (!item) return <h2>Товар не знайдено</h2>;

  return (
    <div style={{ padding: "50px", color: "#fff" }}>
      <h1>{item.title}</h1>

      {/* 🔥 компонент вибору розміру */}
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
