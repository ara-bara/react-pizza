import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Items from "../../components/Catalog/Items";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import { itemsData } from "./Home.data";

const Home = ({
  orders,
  addToOrder,
  deleteOrder,
  updateQuantity,
  checkout,
  totalItems,
  totalPrice,
  subtotal,
  discountAmount,
  onOpenCart,
  onCloseCart,
  cartOpen,
  discount,
}) => {
  const location = useLocation();

  const itemsRef = useRef(null);
  const footerRef = useRef(null);

  const HEADER_HEIGHT = 115;

  const scrollToItems = () => {
    if (!itemsRef.current) return;

    const top = itemsRef.current.offsetTop - HEADER_HEIGHT;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const scrollToFooter = () => {
    if (!footerRef.current) return;

    const top = footerRef.current.offsetTop - HEADER_HEIGHT;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (location.state?.scrollTo === "items") {
      scrollToItems();
    }

    if (location.state?.scrollTo === "footer") {
      scrollToFooter();
    }
  }, [location.state]);

  return (
    <div className="wrapper">
      <Header
        orders={orders}
        onDelete={deleteOrder}
        onUpdateQuantity={updateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onCheckout={checkout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
        onScrollToItems={scrollToItems}
        onScrollToFooter={scrollToFooter}
      />

      <main className={`content-area ${cartOpen ? "blur" : ""}`}>
        <Slider onScrollToItems={scrollToItems} />

        <div ref={itemsRef}>
          <Items
            items={itemsData}
            onAdd={addToOrder}
            orders={orders}
            onOpenCart={onOpenCart}
            discount={discount}
          />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
