import { useState } from "react";
import styles from "./CheckOut.module.scss";

const Checkout = ({
  orders,
  totalItems,
  subtotal,
  discountAmount,
  totalPrice,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <main className={styles.success}>
        <h1>🎉 Замовлення оформлено!</h1>
        <p>Очікуйте дзвінок від оператора для підтвердження.</p>

        <button onClick={() => (window.location.href = "/")}>
          Повернутись на головну
        </button>
      </main>
    );
  }

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <h1>Оформлення замовлення</h1>

        <div className={styles.checkoutLayout}>
          <form className={styles.checkoutForm}>
            <section className={styles.checkoutCard}>
              <h2>Контактні дані</h2>
              <input type="text" placeholder="Ім'я" required />
              <input type="tel" placeholder="Номер телефону" required />
              <input type="email" placeholder="E-mail" />
            </section>

            <section className={styles.checkoutCard}>
              <h2>Дані про доставку</h2>
              <input type="text" placeholder="Населений пункт" required />

              <div className={styles.checkoutRow}>
                <input type="text" placeholder="Будинок" required />
                <input type="text" placeholder="Квартира" />
              </div>
            </section>

            <section className={styles.checkoutCard}>
              <h2>Час доставки</h2>
              <select>
                <option>Якнайшвидше</option>
                <option>На конкретний час</option>
              </select>
            </section>

            <section className={styles.checkoutCard}>
              <h2>Спосіб оплати</h2>
              <select>
                <option value="">Оберіть спосіб</option>
                <option>Готівкою</option>
                <option>Карткою</option>
              </select>
            </section>

            <section className={styles.checkoutCard}>
              <h2>Коментар</h2>
              <textarea placeholder="Побажання" />
            </section>
          </form>

          <aside className={styles.checkoutOrder}>
            <h2>Ваше замовлення</h2>

            {orders.length === 0 ? (
              <p>Кошик порожній</p>
            ) : (
              orders.map((item) => (
                <div key={item.id} className={styles.checkoutItem}>
                  <div className={styles.checkoutItemInfo}>
                    <span>{item.title}</span>
                    <small>{item.qty} шт</small>
                  </div>

                  <div>{(item.price * item.qty).toFixed(0)} ₴</div>
                </div>
              ))
            )}

            <div className={styles.checkoutTotal}>
              <div>
                <span>{totalItems} товарів</span>
                <b>{subtotal.toFixed(0)} ₴</b>
              </div>

              <div>
                <span>Знижка</span>
                <b>{discountAmount.toFixed(0)} ₴</b>
              </div>

              <div className={styles.final}>
                <span>До сплати</span>
                <b>{totalPrice.toFixed(0)} ₴</b>
              </div>
            </div>

            <button
              type="button"
              className={styles.checkoutSubmit}
              onClick={handleOrder}
              disabled={isLoading || orders.length === 0}
            >
              {isLoading ? "Оформляємо..." : "Оформити замовлення"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
