import { useParams } from "react-router-dom";
import { itemsData } from "../Home/Home.data";
import PizzaConstructor from "../PizzaConstructor/PizzaConstructor";

const ProductPage = () => {
  const { id } = useParams();

  if (Number(id) === 12) {
    return <PizzaConstructor />;
  }

  const item = itemsData.find((el) => el.id === Number(id));

  if (!item) return <h2>Товар не знайдено</h2>;

  return (
    <div style={{ padding: "50px", color: "#fff" }}>
      <h1>{item.title}</h1>
      <img
        src={process.env.PUBLIC_URL + "/img/" + item.img}
        alt={item.title}
        width={300}
      />
      <p>{item.ingredients}</p>
      <h2>{item.price} грн</h2>
    </div>
  );
};

export default ProductPage;
