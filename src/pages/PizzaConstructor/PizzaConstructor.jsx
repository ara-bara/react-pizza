import { useState } from "react";
import picture from "../../assets/img/konstruktor.webp";
import styles from "./PizzaConstructor.module.scss";
import { ingredientsData } from "./ingredients";

const PizzaConstructor = () => {
  const categories = ["cheese", "meat", "vegetables", "fruits", "fish", "base"];

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <div className={styles.wrapper} style={{ padding: "50px", color: "#fff" }}>
      <div>
        <div>
          <img src={picture} alt="Інтерактивний конструктор піци" />
        </div>
        <div>
          <h2>Вибрані інгредієнти</h2>
          <div>
            {selectedIngredients.map((selectedItem) => (
              <div className={styles.selectedItem} key={selectedItem.id}>
                <div className={styles.selectedName}>{selectedItem.name}</div>
                <div className={styles.price}>{selectedItem.price} грн</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Інгредієнти</h2>
          <div>
            {categories.map((cat) => (
              <div key={cat} className={styles.category}>
                <h3 className={styles.categoryTitle}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </h3>

                <div className={styles.items}>
                  {ingredientsData
                    .filter((item) => item.category === cat)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={styles.item}
                        onClick={() =>
                          setSelectedIngredients((prev) => [...prev, item])
                        }
                      >
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.weight}>{item.weight} г</div>
                        <div className={styles.price}>{item.price} грн</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          Ціна:{" "}
          {selectedIngredients.reduce(
            (sum, ingredient) => sum + ingredient.price,
            0
          )}{" "}
          грн
        </div>
      </div>
    </div>
  );
};

export default PizzaConstructor;
