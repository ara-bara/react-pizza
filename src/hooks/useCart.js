import { useEffect, useState } from "react";

const CART_KEY = "react_pizza_cart";

export function useCart() {
  const [orders, setOrders] = useState(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(orders));
  }, [orders]);

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
          : el,
      ),
    );
  };

  const checkout = () => {
    console.log("Замовлення:", orders);
    console.log("Сума до оплати:", totalPrice);

    setOrders([]);
    localStorage.removeItem(CART_KEY);
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
