import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Додано імпорти для роутингу

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
  onScrollToItems, // 1. Приймаємо функцію прокрутки
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate(); // Хук для навігації
  const location = useLocation(); // Хук для отримання поточного шляху

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
    closeMenu(); // Закриваємо мобільне меню

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
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={styles.header}
    >
      <Container fluid className={styles.headerContainer}>
        {/* 3. Логотип / Обробник кліку */}
        {/* Використовуємо div з onClick для контролю прокрутки */}
        <div
          className={styles.logoContainer}
          onClick={handleLogoClick}
          role="link" // Для доступності
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
            {/* Посилання "Головна" тепер викликає ту ж функцію прокрутки */}
            <Nav.Link
              as={Link}
              to="/"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleLogoClick(e); // Викликаємо ту ж логіку для прокрутки/навігації
                closeMenu();
              }}
            >
              Головна
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={styles.navLink}
              onClick={closeMenu}
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
