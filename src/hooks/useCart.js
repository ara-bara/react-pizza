import { useState } from "react";

export function useCart() {
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ➕ Додати товар
  const addToOrder = (item) => {
    const exists = orders.some((el) => el.id === item.id);
    if (!exists) {
      setOrders([...orders, { ...item, quantity: 1 }]);
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
    const total = orders.reduce((sum, el) => sum + el.price * el.quantity, 0);
    const discount = total >= 1000 ? total * 0.1 : 0;
    const finalTotal = total - discount;
    console.log("Загальна сума:", finalTotal);
    setOrders([]);
  };

  // 🛒 Відкрити / закрити корзину
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // 🧮 Підрахунок
  const totalItems = orders.reduce((sum, el) => sum + el.quantity, 0);
  const totalPrice = orders.reduce(
    (sum, el) => sum + el.quantity * el.price,
    0
  );
  const discount = totalPrice >= 1000 ? 0.1 : 0;
  const finalPrice = totalPrice * (1 - discount);

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
    totalPrice: finalPrice,
    discount,
  };
}
