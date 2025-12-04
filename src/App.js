import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    orders,
    addToOrder,
    deleteOrder,
    updateQuantity,
    checkout,
    totalItems,
    subtotal,
    discountPercent,
    discountAmount,
    totalPrice,
    cartOpen,
    openCart,
    closeCart,
  } = useCart();

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              orders={orders}
              addToOrder={addToOrder}
              deleteOrder={deleteOrder}
              updateQuantity={updateQuantity}
              checkout={checkout}
              totalItems={totalItems}
              totalPrice={totalPrice}
              subtotal={subtotal}
              discountAmount={discountAmount}
              discount={discountPercent}
              onOpenCart={openCart}
              onCloseCart={closeCart}
              cartOpen={cartOpen}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductPage
              addToOrder={addToOrder}
              orders={orders}
              onDelete={deleteOrder}
              onUpdateQuantity={updateQuantity}
              totalItems={totalItems}
              totalPrice={totalPrice}
              subtotal={subtotal}
              discountAmount={discountAmount}
              discount={discountPercent}
              onCheckout={checkout}
              onOpenCart={openCart}
              onCloseCart={closeCart}
              cartOpen={cartOpen}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
