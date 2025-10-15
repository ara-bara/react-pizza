import React, { Component } from 'react';
import styles from './Item.module.scss';
import doneIcon from '../img/done-icon.svg';

export class Item extends Component {
   render() {
      const { item, orders, onAdd, onOpenCart, discount } = this.props;
      const isInCart = orders.some(order => order.id === item.id);
      const itemInCart = orders.find(order => order.id === item.id);

      const totalPriceForItem = itemInCart ? itemInCart.price * itemInCart.quantity : 0;
      const finalPrice = totalPriceForItem * (1 - discount);

      return (
         <div className={`${styles.item} ${styles[`item-${item.id}`]}`}>
            <img
               src={process.env.PUBLIC_URL + "/img/" + item.img}
               alt={item.title}
               className={`${styles.itemImg}`}
            />
            <div className={`${styles.itemTitle}`}>{item.title}</div>
            <div className={`${styles.itemDescription}`}>
               <span className={`${styles.itemWeight}`}>{item.weight}</span>
               <span className={`${styles.itemIngredients}`}>{item.ingredients}</span>
            </div>
            <div className={styles.priceContainer}>
               {isInCart ? (
                  <div className={styles.inCart} onClick={onOpenCart}>
                     <img
                        src={doneIcon}
                        alt="Done"
                        className="doneIcon"
                     />
                     В кошику <span> {itemInCart.quantity} </span>  шт за  <span>{finalPrice.toFixed()} </span> грн
                  </div>
               ) : (
                  <>
                     <h2 className={styles.itemPrice}>{item.price} грн</h2>
                     <h2 className={styles.addToCart} onClick={() => onAdd(item)}>
                        Додати в кошик
                     </h2>
                  </>
               )}
            </div>
         </div>
      );
   }
}

export default Item;