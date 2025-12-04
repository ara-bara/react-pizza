import { useState } from "react";
import quantityMinus from "../../assets/icons/minus.svg";
import quantityPlus from "../../assets/icons/plus.svg";
import picture from "../../assets/img/konstruktor.webp";
import Header from "../../components/Header/Header";
import SizePicker from "../../components/UI/SizePicker/SizePicker";
import styles from "./PizzaConstructor.module.scss";
import { ingredientsData } from "./ingredients";

const PizzaConstructor = ({
  addToOrder,
  orders,
  onDelete,
  onUpdateQuantity,
  totalItems,
  totalPrice: cartTotalPrice,
  onCheckout,
  onOpenCart,
  onCloseCart,
  cartOpen,
  subtotal,
  discountAmount,
}) => {
  const categories = ["cheese", "meat", "vegetables", "fruits", "fish", "base"];

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [pizzaSize, setPizzaSize] = useState("30");
  const [count, setCount] = useState(1);

  const sizeMultiplier = {
    30: 1,
    40: 1.2,
    50: 1.4,
  };

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

  const totalPrice =
    150 * sizeMultiplier[pizzaSize] +
    selectedIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.quantity,
      0
    );

  const handleAddPizza = () => {
    const ingredientNames = selectedIngredients.map((item) => item.name);
    const limitedNames = ingredientNames.slice(0, 3);

    let customTitle;
    if (limitedNames.length > 0) {
      customTitle = `Піца з ${limitedNames.join(", ")}`;
      if (ingredientNames.length > 3) {
        customTitle += " та ін.";
      }
    } else {
      customTitle = "Базова Піца";
    }

    const finalTitle = `${customTitle}, ${pizzaSize} см`;

    const pizzaObject = {
      id: Date.now(),
      custom: true,
      title: finalTitle,
      size: pizzaSize,
      ingredients: selectedIngredients,
      price: totalPrice,
      quantity: count,
      img: "konstruktor.webp",
    };

    addToOrder(pizzaObject);
    setCount(1);
  };

  const finalTotal = totalPrice * count;

  return (
    <>
      <Header
        orders={orders}
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        totalItems={totalItems}
        totalPrice={cartTotalPrice}
        onCheckout={onCheckout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
        subtotal={subtotal}
        discountAmount={discountAmount}
      />

      <div className={styles.pageContent}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.konstructorImage}>
              <img src={picture} alt="Інтерактивний конструктор піци" />
            </div>

            <div className={styles.containerSelectedIngredients}>
              <h2 style={{ textAlign: "center" }}>Вибрані інгредієнти</h2>
              <div style={{ textAlign: "center" }}>
                Базова ціна включає лише тісто діаметром 30 см
              </div>

              <div className={styles.selectedIngredients}>
                {selectedIngredients.map((selectedItem) => (
                  <div className={styles.selectedItem} key={selectedItem.id}>
                    <div className={styles.selectedName}>
                      {selectedItem.name}
                    </div>

                    <div className={styles.conteinerPrice}>
                      <div className={styles.quantity}>
                        <img
                          onClick={() => changeQuantity(selectedItem.id, -1)}
                          src={quantityMinus}
                          alt="minus"
                        />
                        <span>{selectedItem.quantity}</span>

                        {selectedItem.category !== "base" && (
                          <img
                            onClick={() => changeQuantity(selectedItem.id, +1)}
                            src={quantityPlus}
                            alt="plus"
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
            <h2>Інгредієнти</h2>

            <SizePicker pizzaSize={pizzaSize} setPizzaSize={setPizzaSize} />

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

          <div className={styles.bottomBar}>
            <div className={styles.priceBlock}>Ціна: {finalTotal} грн</div>

            <div className={styles.quantityBlock}>
              <button onClick={() => setCount((c) => Math.max(1, c - 1))}>
                -
              </button>
              <span>{count}</span>
              <button onClick={() => setCount((c) => c + 1)}>+</button>
            </div>

            <button className={styles.addButton} onClick={handleAddPizza}>
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaConstructor;
