import clockIcon from "../../assets/icons/clock.png";
import locationIcon from "../../assets/icons/location.png";
import logoIcon from "../../assets/icons/logo.png";
import phoneIcon from "../../assets/icons/telephone.png";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerCard}>
        <div className={styles.brandSection}>
          <img src={logoIcon} alt="React Pizza логотип" />
          <p>Гаряча піца, фірмові соуси та конструктор власного рецепта.</p>
        </div>

        <div className={styles.infoSection}>
          <h2>Замовлення</h2>
          <p>Працюємо щодня та готуємо піцу після оформлення замовлення.</p>
          <p>Обирай готову піцу або створи власну у конструкторі.</p>
        </div>

        <div className={styles.contactsSection}>
          <h2>Контакти</h2>

          <div>
            <img src={locationIcon} alt="" />
            <span>Луцьк, Україна</span>
          </div>

          <div>
            <img src={phoneIcon} alt="" />
            <a href="tel:+380667119291">066 711 92 91</a>
          </div>

          <div>
            <img src={clockIcon} alt="" />
            <span>11:00 - 22:00</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomLine}>
        © 2026 React Pizza. Усі права захищено.
      </div>
    </footer>
  );
};

export default Footer;
