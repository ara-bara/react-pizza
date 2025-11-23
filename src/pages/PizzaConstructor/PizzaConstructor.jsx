import { useState } from "react";
import quantityMinus from "../../assets/icons/minus.svg";
import quantityPlus from "../../assets/icons/plus.svg";
import picture from "../../assets/img/konstruktor.webp";
import styles from "./PizzaConstructor.module.scss";
import { ingredientsData } from "./ingredients";

const PizzaConstructor = () => {
  const categories = ["cheese", "meat", "vegetables", "fruits", "fish", "base"];

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const removerIngredient = (id) => {
    setSelectedIngredients((prev) => prev.filter((el) => el.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setSelectedIngredients((prev) =>
      prev
        .map((el) => {
          if (el.id === id) {
            const newQuantity = el.quantity + delta;
            if (newQuantity <= 0) return null;
            return { ...el, quantity: newQuantity };
          }
          return el;
        })
        .filter(Boolean)
    );
  };

  return (
    <div className={styles.wrapper} style={{ padding: "50px", color: "#fff" }}>
      <div>
        <div>
          <img src={picture} alt="Інтерактивний конструктор піци" />
        </div>

        <div>
          <h2>Вибрані інгредієнти</h2>
          <div>Базова ціна включає лише тісто діаметром 30 см</div>

          <div>
            {selectedIngredients.map((selectedItem) => (
              <div className={styles.selectedItem} key={selectedItem.id}>
                <div className={styles.selectedName}>{selectedItem.name}</div>

                <div className={styles.conteinerPrice}>
                  <div className={styles.quantity}>
                    <img
                      onClick={() => changeQuantity(selectedItem.id, -1)}
                      src={quantityMinus}
                      alt="quantityMinus"
                      className={styles.quantityMinus}
                    />
                    <span>{selectedItem.quantity}</span>

                    {selectedItem.category !== "base" && (
                      <img
                        onClick={() => changeQuantity(selectedItem.id, +1)}
                        src={quantityPlus}
                        alt="quantityPlus"
                        className={styles.quantityPlus}
                      />
                    )}
                  </div>

                  <div className={styles.price}>
                    {selectedItem.price * selectedItem.quantity} грн
                  </div>
                </div>
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
                    .map((item) => {
                      const isSelected = selectedIngredients.some(
                        (el) => el.id === item.id
                      );

                      return (
                        <div
                          key={item.id}
                          className={`${styles.item} ${
                            isSelected ? styles.itemSelected : ""
                          }`}
                          onClick={() => {
                            if (!isSelected) {
                              setSelectedIngredients((prev) => [
                                ...prev,
                                { ...item, quantity: 1 },
                              ]);
                            }
                          }}
                        >
                          {isSelected && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                removerIngredient(item.id);
                              }}
                              className={styles.statusIcon}
                            ></div>
                          )}

                          <div className={styles.itemImage}>
                            <img
                              className={styles.selectedImg}
                              src={process.env.PUBLIC_URL + "/img/" + item.img}
                              alt={item.name}
                            />
                          </div>

                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.weight}>{item.weight} г</div>
                          <div className={styles.price}>{item.price} грн</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          Ціна:{" "}
          {selectedIngredients.reduce(
            (sum, ingredient) => sum + ingredient.price * ingredient.quantity,
            150
          )}{" "}
          грн
        </div>
      </div>
    </div>
  );
};

export default PizzaConstructor;
