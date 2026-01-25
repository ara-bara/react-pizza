import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import SaucePage from "./pages/SaucePage/SaucePage";
import SaucesPage from "./pages/SaucesPage/SaucesPage";
import { useCart } from "./hooks/useCart";
import { useScrollToTop } from "./hooks/useScrollToTop";

function AppRoutes({
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
}) {
  useScrollToTop(); // ✅ всередині Router

  return (
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

      <Route
        path="/sauces"
        element={
          <SaucesPage
            orders={orders}
            addToOrder={addToOrder}
            deleteOrder={deleteOrder}
            updateQuantity={updateQuantity}
            checkout={checkout}
            totalItems={totalItems}
            totalPrice={totalPrice}
            subtotal={subtotal}
            discountAmount={discountAmount}
            onOpenCart={openCart}
            onCloseCart={closeCart}
            cartOpen={cartOpen}
          />
        }
      />

      <Route
        path="/sauce/:id"
        element={
          <SaucePage
            orders={orders}
            addToOrder={addToOrder}
            onDelete={deleteOrder}
            onUpdateQuantity={updateQuantity}
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
    </Routes>
  );
}

function App() {
  const cart = useCart();

  return (
    <HashRouter>
      <AppRoutes
        orders={cart.orders}
        addToOrder={cart.addToOrder}
        deleteOrder={cart.deleteOrder}
        updateQuantity={cart.updateQuantity}
        checkout={cart.checkout}
        totalItems={cart.totalItems}
        subtotal={cart.subtotal}
        discountPercent={cart.discountPercent}
        discountAmount={cart.discountAmount}
        totalPrice={cart.totalPrice}
        cartOpen={cart.cartOpen}
        openCart={cart.openCart}
        closeCart={cart.closeCart}
      />
    </HashRouter>
  );
}

export default App;
