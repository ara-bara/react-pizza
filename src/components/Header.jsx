import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../img/logo.svg";
import Order from "./Order";
import closeIcon from "../img/close-icon.svg";
import linkedinIcon from "../img/linkedin.svg";
import instagramIcon from "../img/instagram.svg";
import facebookIcon from "../img/facebook.svg";

const showOrders = (orders, onDelete, onUpdateQuantity, totalPrice) => {
   const discount = totalPrice >= 1000 ? 0.1 : 0;
   return (
      <div>
         {orders.map((el) => (
            <Order
               onDelete={onDelete}
               key={el.id}
               item={el}
               onUpdateQuantity={onUpdateQuantity}
               discount={discount}
            />
         ))}
      </div>
   );
};

const showNothing = () => (
   <div className="empty">
      <h2>Немає товарів</h2>
   </div>
);

const Header = ({
   orders,
   onDelete,
   onUpdateQuantity,
   totalItems,
   totalPrice,
   onCheckout,
   onOpenCart,
   cartOpen,
   onCloseCart,
}) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      if (cartOpen) onCloseCart();
   };

   const handleCartClick = () => {
      if (cartOpen) {
         onCloseCart();
      } else {
         onOpenCart();
         setIsMenuOpen(false);
      }
   };

   const basketStyle = {
      width: totalItems <= 13 ? "117px" : `${117 + (totalItems - 13) * 10}px`,
      maxWidth: "250px",
      transition: "width 0.3s ease-in-out",
   };

   return (
      <Navbar collapseOnSelect expand="lg" fixed="top">
         <Container className="container-custom">
            <Navbar.Brand href="/">
               <img
                  src={logo}
                  style={{ marginLeft: "32px" }}
                  width="114px"
                  height="72.41px"
                  className="d-inline-block align-top"
                  alt="logo"
               />
            </Navbar.Brand>
            <div className="d-flex align-items-center">
               <span className="d-lg-none me-2 fw-bold" style={{ color: "#FFFFFF" }}>
                  Меню
               </span>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleMenu} />
            </div>
            <Navbar.Collapse in={isMenuOpen}>
               <Nav className="mr-auto">
                  <Nav.Link href="/">Каталог</Nav.Link>
                  <Nav.Link href="/catering">Кейтеринг</Nav.Link>
                  <Nav.Link href="/about">Про нас</Nav.Link>
                  <Nav.Link href="/contacts">Контакти</Nav.Link>
                  <div className="d-md-none mt-3">
                     <div className="contacts">
                        <div className="contacts__email">
                           <a href="mailto:yumbox.lutsk@gmail.com">yumbox.lutsk@gmail.com</a>
                        </div>
                        <div className="contacts__phone">
                           <a href="tel: +380 93 823 92 93"> +380 93 823 92 93</a>
                        </div>
                     </div>
                     <div className="d-flex align-items-center mb-2 social-media">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                           <img src={linkedinIcon} alt="LinkedIn" className="me-2" />
                        </a>
                        <a href="https://www.instagram.com/yumbox.lutsk" target="_blank" rel="noopener noreferrer">
                           <img src={instagramIcon} alt="Instagram" className="me-2" />
                        </a>
                        <a href="https://www.facebook.com/yumbox.lutsk" target="_blank" rel="noopener noreferrer">
                           <img src={facebookIcon} alt="Facebook" className="me-2" />
                        </a>
                     </div>
                  </div>
               </Nav>
            </Navbar.Collapse>
            <div className="container-order">
               <div
                  onClick={handleCartClick}
                  className={`basket ${cartOpen ? "active" : ""} ${isMenuOpen ? "menu-open" : ""}`}
                  style={basketStyle}
               >
                  <div className="basket__quantity">
                     <div>{totalItems}</div>
                  </div>
                  <div className="basket__sum">{totalPrice.toFixed()} грн</div>
               </div>
               {cartOpen && (
                  <div className="shop-cart">
                     <div className="cart-header">
                        <h2>Корзина</h2>
                        <img
                           src={closeIcon}
                           alt="Закрити"
                           onClick={handleCartClick}
                           className="close-icon"
                        />
                     </div>
                     {orders.length > 0
                        ? showOrders(orders, onDelete, onUpdateQuantity, totalPrice)
                        : showNothing()}
                     {orders.length > 0 && (
                        <div className="order-summary">
                           <div className="order-summary__delivery">
                              <div className="order-summary__delivery-text">Доставка</div>
                              <div className="order-summary__delivery-price">
                                 50 <span>&#x20b4;</span>
                              </div>
                           </div>
                           <div className="order-summary__button">
                              <button
                                 className="order-summary__button-action"
                                 onClick={onCheckout}
                              >
                                 оформити за {totalPrice.toFixed()} &#8372;
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </Container>
      </Navbar>
   );
};

export default Header;