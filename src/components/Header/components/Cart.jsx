// Cart.jsx

import closeIcon from "../../../assets/icons/close-icon.svg";
import "./Cart.scss";
import CartItem from "./CartItem";

const Cart = ({
  orders,
  onDelete,
  onUpdateQuantity,
  // Приймаємо нові пропси для підсумку
  subtotal,
  discountAmount,
  totalPrice,
  onCheckout,
  closeCart,
}) => {
  // Розрахунок відсотка знижки для передачі в CartItem
  // Це необхідно, щоб CartItem знав, яку знижку застосувати до ціни кожного товару.
  const discountPercent = subtotal > 0 ? discountAmount / subtotal : 0;

  return (
    <div className="shop-cart">
      <div className="cart-header">
        <h2>Корзина</h2>
        <img
          src={closeIcon}
          alt="Закрити"
          className="close-icon"
          onClick={closeCart}
        />
      </div>

      {orders.length > 0 ? (
        orders.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            // Передаємо відсоток знижки в CartItem
            discount={discountPercent}
            onDelete={onDelete}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))
      ) : (
        <div className="empty">
          <h2>Немає товарів</h2>
        </div>
      )}

      {orders.length > 0 && (
        <div className="order-summary">
          <div>
            {/* 1. Сума (Subtotal) */}
            <div>Сума: {subtotal.toFixed(0)} ₴</div>
            {/* 2. Знижка (Discount Amount) */}
            <div>
              Знижка:{" "}
              <span className="discount-amount">
                {discountAmount.toFixed(0)} ₴
              </span>
            </div>
          </div>
          <div className="order-summary__button">
            <div>До сплати: {totalPrice.toFixed(0)} ₴</div>
            <button
              className="order-summary__button-action"
              onClick={onCheckout}
            >
              Оформити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
