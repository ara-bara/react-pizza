import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "../../components/Catalog/Items";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import { useCart } from "../../hooks/useCart";
import { itemsData } from "./Home.data";

const Home = () => {
  const {
    orders,
    addToOrder,
    deleteOrder,
    updateQuantity,
    checkout,
    totalItems,
    totalPrice,
    discount,
    cartOpen,
    openCart,
    closeCart,
  } = useCart();

  // 1. Створення ref для секції каталогу
  const itemsRef = useRef(null);

  // 2. Функція для прокрутки до каталогу
  const scrollToItems = () => {
    if (itemsRef.current) {
      // Плавна прокрутка до початку секції з каталогом
      itemsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="wrapper">
      <Header
        orders={orders}
        onDelete={deleteOrder}
        onUpdateQuantity={updateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={checkout}
        onOpenCart={openCart}
        onCloseCart={closeCart}
        cartOpen={cartOpen}
        onScrollToItems={scrollToItems} // 3. Передаємо функцію прокрутки в Header
      />

      <div className={cartOpen ? "blur" : ""}>
        <Slider />
        {/* 4. Обгортаємо Items у div з ref для прокрутки */}
        <div ref={itemsRef}>
          <Items
            items={itemsData}
            onAdd={addToOrder}
            orders={orders}
            onOpenCart={openCart}
            discount={discount}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
