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
      />

      <div className={cartOpen ? "blur" : ""}>
        <Slider />
        <Items
          items={itemsData}
          onAdd={addToOrder}
          orders={orders}
          onOpenCart={openCart}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default Home;
