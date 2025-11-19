import React from "react";
import deleteIcon from "../../../assets/icons/basket.png";
import arrowUp from "../../../assets/icons/plus.svg";
import arrowDown from "../../../assets/icons/minus.svg";

const CartItem = ({ item, onDelete, onUpdateQuantity, discount }) => {
  const finalPrice = item.price * item.quantity * (1 - discount);

  return (
    <div className="order">
      <div className="order-info">
        <div className="order-info__img">
          <img
            src={`${process.env.PUBLIC_URL}/img/${item.picture}`}
            alt={item.title}
          />
        </div>

        <div className="order-info__text">
          <h2>{item.title}</h2>
          <p>{item.weight}</p>
        </div>

        <div className="delete-icon" onClick={() => onDelete(item.id)}>
          <img src={deleteIcon} alt="Видалити" />
        </div>
      </div>

      <div className="order-price">
        <h2>
          {finalPrice.toFixed(0)} <span>₴</span>
        </h2>

        <div className="quantity-control">
          <img src={arrowDown} onClick={() => onUpdateQuantity(item.id, -1)} />
          <span>{item.quantity}</span>
          <img src={arrowUp} onClick={() => onUpdateQuantity(item.id, 1)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
