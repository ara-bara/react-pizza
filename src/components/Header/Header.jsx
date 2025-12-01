import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  onScrollToItems,
  onScrollToFooter,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (cartOpen) onCloseCart();
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === "/") {
      onScrollToItems();
    } else {
      navigate("/");
    }
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
    // 💡 ВИПРАВЛЕНО: Змінено styles.header на styles.navbar, щоб застосувати стилі з SCSS
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={styles.navbar}
    >
      {/* ❗ У Header.module.scss ви не визначили .headerContainer, 
          але я залишаю його як є, оскільки він, ймовірно, знаходиться у Mixin.scss */}
      <Container fluid className={styles.headerContainer}>
        <div
          className={styles.logoContainer}
          onClick={handleLogoClick}
          role="link"
        >
          <img src={logo} alt="Black Pizza Logo" className={styles.logo} />
        </div>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={toggleMenu}
          className={styles.burger}
        />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={isMenuOpen ? styles.open : ""}
        >
          <Nav className="me-auto">
            {/* Посилання "Головна" */}
            <Nav.Link
              as={Link}
              to="/"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleLogoClick(e);
                closeMenu();
              }}
            >
              Головна
            </Nav.Link>

            {/* Посилання "Контакти" - ВИПРАВЛЕНО: Використовуємо state для надійності */}
            <Nav.Link
              as={Link}
              to="/"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                closeMenu();

                if (location.pathname === "/") {
                  onScrollToFooter();
                } else {
                  // Перехід на головну з передачею стану для прокрутки
                  navigate("/", { state: { scrollTo: "footer" } });
                }
              }}
            >
              Контакти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* 🛒 Кошик */}
        <div className={styles.orderContainer}>
          <div
            onClick={handleCartClick}
            className={`${styles.basket} ${cartOpen ? styles.active : ""}`}
            style={basketStyle}
          >
            <div className={styles.basketQuantity}>
              <span className={styles.basketQuantityValue}>{totalItems}</span>
            </div>

            <div className={styles.basketSum}>
              {(totalPrice || 0).toFixed(2)} грн
            </div>
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
