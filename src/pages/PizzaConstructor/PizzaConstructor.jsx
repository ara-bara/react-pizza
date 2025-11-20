import styles from "./PizzaConstructor.module.scss";
import picture from "../../assets/img/konstruktor.webp"

const PizzaConstructor = () => {
  return (
    <div className={styles.wrapper} style={{ padding: "50px", color: "#fff" }}>
      <div>
        <img src={picture} alt="Інтерактивний конструктор піци" />
      </div>
      <div>
        <h1>Твоя піца</h1>
        <div>Інгредієнти</div>
        <div>Ціна</div>
      </div>
    </div>
  );
};

export default PizzaConstructor;
