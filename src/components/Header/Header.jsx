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
  onScrollToSouce,
  subtotal,
  discountAmount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      onScrollToItems();
    } else {
      navigate("/", { state: { scrollTo: "items" } });
    }
  };

  const handleContactsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      onScrollToFooter();
    } else {
      navigate("/", { state: { scrollTo: "footer" } });
    }
  };

  const handleSouceClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/souces");
  };

  const handleCartClick = () => {
    cartOpen ? onCloseCart() : onOpenCart();
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo} onClick={handleHomeClick}>
          <img src={logo} alt="Black Pizza Logo" />
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link to="/" onClick={handleHomeClick}>
            Головна
          </Link>

          <Link to="/" onClick={handleMenuClick}>
            Меню
          </Link>

          <Link to="/" onClick={handleSouceClick}>
            Соуси
          </Link>

          <Link to="/" onClick={handleContactsClick}>
            Контакти
          </Link>
        </nav>

        <div
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

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
