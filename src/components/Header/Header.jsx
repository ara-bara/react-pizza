import { useState } from "react";
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
  subtotal,
  discountAmount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /** Головна */
  const handleHomeClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // Просто переходимо на головну
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /** Меню */
  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      onScrollToItems();
    } else {
      navigate("/", { state: { scrollTo: "items" } });
    }
  };

  /** Контакти */
  const handleContactsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      onScrollToFooter();
    } else {
      navigate("/", { state: { scrollTo: "footer" } });
    }
  };

  /** Кошик */
  const handleCartClick = () => {
    cartOpen ? onCloseCart() : onOpenCart();
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* ЛОГО */}
        <div className={styles.logo} onClick={handleHomeClick}>
          <img src={logo} alt="Black Pizza Logo" />
        </div>

        {/* Меню */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link to="/" onClick={handleHomeClick}>
            Головна
          </Link>

          <Link to="/" onClick={handleMenuClick}>
            Меню
          </Link>

          <Link to="/" onClick={handleContactsClick}>
            Контакти
          </Link>
        </nav>

        {/* Бургер */}
        <div
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Кошик */}
        <div className={styles.orderContainer}>
          <div className={styles.basket} onClick={handleCartClick}>
            <div className={styles.basketQuantity}>
              <span>{totalItems}</span>
            </div>

            <div className={styles.basketSum}>
              {(totalPrice || 0).toFixed(0)} грн
            </div>
          </div>

          {cartOpen && (
            <Cart
              orders={orders}
              onDelete={onDelete}
              onUpdateQuantity={onUpdateQuantity}
              subtotal={subtotal}
              discountAmount={discountAmount}
              totalPrice={totalPrice}
              onCheckout={onCheckout}
              closeCart={onCloseCart}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
