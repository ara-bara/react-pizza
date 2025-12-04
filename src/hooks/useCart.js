import { useState } from "react";

export function useCart() {
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ➕ Додати товар
  const addToOrder = (item) => {
    const exists = orders.some((el) => el.id === item.id);
    if (!exists) {
      setOrders([...orders, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  // ❌ Видалити товар
  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
  };

  // 🔄 Змінити кількість
  const updateQuantity = (id, delta) => {
    setOrders(
      orders.map((el) =>
        el.id === id
          ? { ...el, quantity: Math.max(1, el.quantity + delta) }
          : el
      )
    );
  };

  // ✔️ Оформити замовлення
  const checkout = () => {
    console.log("Замовлення:", orders);
    console.log("Сума до оплати:", totalPrice);
    setOrders([]);
  };

  // 🛒 Відкрити / закрити корзину
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // 🧮 Кількість товарів
  const totalItems = orders.reduce((sum, el) => sum + el.quantity, 0);

  // 🔥 Сума без знижки
  const subtotal = orders.reduce((sum, el) => sum + el.quantity * el.price, 0);

  // 🔥 10% знижки при сумі ≥ 1000
  const discountPercent = subtotal >= 1000 ? 0.1 : 0;

  // 🔥 Сума знижки у грн
  const discountAmount = subtotal * discountPercent;

  // 🔥 Фінальна сума
  const totalPrice = subtotal - discountAmount;

  return {
    orders,
    addToOrder,
    deleteOrder,
    updateQuantity,
    checkout,

    cartOpen,
    openCart,
    closeCart,

    totalItems,

    subtotal, // сума без знижки
    discountPercent, // 0 або 0.1
    discountAmount, // гривні знижки
    totalPrice, // сума після знижки
  };
}
