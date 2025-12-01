import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "../../components/Catalog/Items";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import { itemsData } from "./Home.data";

const Home = ({
  orders,
  addToOrder,
  deleteOrder,
  updateQuantity,
  checkout,
  totalItems,
  totalPrice,
  onOpenCart,
  onCloseCart,
  cartOpen,
  discount,
}) => {
  const location = useLocation();

  const itemsRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToItems = () => {
    if (itemsRef.current) {
      itemsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
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
        onCheckout={checkout}
        onOpenCart={onOpenCart}
        onCloseCart={onCloseCart}
        cartOpen={cartOpen}
        onScrollToItems={scrollToItems}
        onScrollToFooter={scrollToFooter}
      />

      <div className={cartOpen ? "blur" : ""}>
        <Slider />

        <div ref={itemsRef}>
          <Items
            items={itemsData}
            onAdd={addToOrder}
            orders={orders}
            onOpenCart={onOpenCart}
            discount={discount}
          />
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
