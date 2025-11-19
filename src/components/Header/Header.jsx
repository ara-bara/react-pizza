import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import facebookIcon from "../../assets/icons/facebook.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import logo from "../../assets/icons/logo.webp";

import Cart from "./components/Cart";

import styles from "./Header.module.scss";

const Header = ({
  orders,
  onDelete,
  onUpdateQuantity,
  totalItems,
  totalPrice,
  onCheckout,
  onOpenCart,
  onCloseCart,
  cartOpen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (cartOpen) onCloseCart();
  };

  const handleCartClick = () => {
    if (cartOpen) onCloseCart();
    else {
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
    <Navbar collapseOnSelect expand="lg" fixed="top" className={styles.navbar}>
      <Container className="container-custom">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="250"
            height="57"
            style={{ marginLeft: "32px" }}
            alt="Logo"
          />
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <span className="d-lg-none me-2 fw-bold" style={{ color: "#FFFFFF" }}>
            Меню
          </span>
          <Navbar.Toggle aria-controls="navbar" onClick={toggleMenu} />
        </div>

        {/* Мобільне меню */}
        <Navbar.Collapse in={isMenuOpen}>
          <Nav className="mr-auto">
            <Nav.Link href="/">Каталог</Nav.Link>
            <Nav.Link href="/catering">Кейтеринг</Nav.Link>
            <Nav.Link href="/about">Про нас</Nav.Link>
            <Nav.Link href="/contacts">Контакти</Nav.Link>

            <div className="d-md-none mt-3">
              <div className={styles.contacts}>
                <a href="mailto:yumbox.lutsk@gmail.com">
                  yumbox.lutsk@gmail.com
                </a>
                <a href="tel: +380938239293">+380 93 823 92 93</a>
              </div>

              <div
                className={`${styles.social} d-flex align-items-center mb-2`}
              >
                <a href="https://linkedin.com" target="_blank">
                  <img src={linkedinIcon} />
                </a>
                <a href="https://instagram.com/yumbox.lutsk" target="_blank">
                  <img src={instagramIcon} />
                </a>
                <a href="https://facebook.com/yumbox.lutsk" target="_blank">
                  <img src={facebookIcon} />
                </a>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>

        {/* 🛒 Кошик */}
        <div className={styles.orderContainer}>
          <div
            onClick={handleCartClick}
            className={`${styles.basket} ${cartOpen ? styles.active : ""}`}
            style={basketStyle}
          >
            <div className={styles.quantity}>{totalItems}</div>
            <div className={styles.sum}>{totalPrice.toFixed(0)} грн</div>
          </div>

          {cartOpen && (
            <Cart
              orders={orders}
              onDelete={onDelete}
              onUpdateQuantity={onUpdateQuantity}
              totalPrice={totalPrice}
              onCheckout={onCheckout}
              closeCart={onCloseCart}
            />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
