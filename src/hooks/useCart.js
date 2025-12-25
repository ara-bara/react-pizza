import { useState } from "react";

export function useCart() {
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToOrder = (item) => {
    const exists = orders.some((el) => el.id === item.id);
    if (!exists) {
      setOrders([...orders, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setOrders(
      orders.map((el) =>
        el.id === id
          ? { ...el, quantity: Math.max(1, el.quantity + delta) }
          : el
      )
    );
  };

  const checkout = () => {
    console.log("Замовлення:", orders);
    console.log("Сума до оплати:", totalPrice);
    setOrders([]);
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const totalItems = orders.reduce((sum, el) => sum + el.quantity, 0);

  const subtotal = orders.reduce((sum, el) => sum + el.quantity * el.price, 0);

  const discountPercent = subtotal >= 1000 ? 0.1 : 0;

  const discountAmount = subtotal * discountPercent;

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
    subtotal,
    discountPercent,
    discountAmount,
    totalPrice,
  };
}
