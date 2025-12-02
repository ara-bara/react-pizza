import closeIcon from "../../../assets/icons/close-icon.svg";
import "./Cart.scss";
import CartItem from "./CartItem";

const Cart = ({
  orders,
  onDelete,
  onUpdateQuantity,
  totalPrice,
  onCheckout,
  closeCart,
}) => {
  const discount = totalPrice >= 1000 ? 0.1 : 0;

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
            discount={discount}
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
          <div className="order-summary__button">
            <div>{ }</div>
            <button
              className="order-summary__button-action"
              onClick={onCheckout}
            >
              оформити за {totalPrice.toFixed(0)} ₴
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
