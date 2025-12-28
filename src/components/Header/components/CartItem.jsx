import deleteIcon from "../../../assets/icons/basket.png";
import arrowDown from "../../../assets/icons/minus.svg";
import arrowUp from "../../../assets/icons/plus.svg";

const CartItem = ({ item, onDelete, onUpdateQuantity, discount }) => {
  const finalPrice = item.price * item.quantity * (1 - discount);

  return (
    <div
      className={`order
    ${item.type === "constructor" ? "order--constructor" : ""}
    ${item.type === "souce" ? "order--souce" : ""}
  `}
    >
      <div className="order-image">
        <img
          src={`${process.env.PUBLIC_URL}/img/${item.picture}`}
          alt={item.title}
        />
      </div>
      <div>
        <div className="order-header">
          <div className="order-ingredients">
            <h2>{item.title}</h2>
            <p>
              {Array.isArray(item.ingredients)
                ? item.ingredients.join(", ")
                : item.ingredients}
            </p>
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
            <img
              src={arrowDown}
              alt=""
              onClick={() => onUpdateQuantity(item.id, -1)}
            />
            <span>{item.quantity}</span>
            <img
              src={arrowUp}
              alt=""
              onClick={() => onUpdateQuantity(item.id, 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
