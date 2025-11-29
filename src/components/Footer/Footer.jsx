// src/components/Footer/Footer.jsx

import { Container } from "react-bootstrap";

// Icons
import clockIcon from "../../assets/icons/clock.png";
import instagramIcon from "../../assets/icons/instagram.svg";
import locationIcon from "../../assets/icons/location.png";
import logoIcon from "../../assets/icons/logo.webp";
import phoneIcon from "../../assets/icons/telephone.png";
import tiktokIcon from "../../assets/icons/tiktok.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import appstoreIcon from "../../assets/icons/appstore.webp";
import googleplayIcon from "../../assets/icons/googleplay.webp";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <Container className={styles.footer}>
        <div className={styles.brandSection}>
          <img src={logoIcon} alt="Black Pizza — логотип" />

          <p>Мабуть, найкраща піцерія у світі ;)</p>

          <div className={styles.copyright}>
            Усi права захищенi ©2025 Black Pizza®
          </div>
        </div>

        <div className={styles.contactsSection}>
          <div className={styles.location}>
            <img src={locationIcon} alt="Локація" />
            <a
              href="https://maps.app.goo.gl/gAwERCKkqPKQ5FkUA"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <h2>м. Луцьк, вул. Липинського, 7</h2>
            </a>
          </div>

          <div className={styles.phone}>
            <img src={phoneIcon} alt="Телефон" />
            <a
              href="tel:+380938239293"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <h2>066 711 92 91</h2>
            </a>
          </div>

          <div className={styles.worktime}>
            <img src={clockIcon} alt="Години роботи" />
            <h2>11:00 - 22:00</h2>
          </div>
        </div>

        <div className={styles.mediaSection}>
          <div className={styles.downloadApp}>
            <h2>Завантажуй додаток:</h2>

            <div className={styles.storeButtons}>
              <a
                href="https://apps.apple.com/cy/app/black-pizza/id1498371417"
                target="_blank"
                rel="noreferrer"
              >
                <img src={appstoreIcon} alt="App Store" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.oakmont.blackpizza"
                target="_blank"
                rel="noreferrer"
              >
                <img src={googleplayIcon} alt="Google Play" />
              </a>
            </div>
          </div>

          <div className={styles.socialMedia}>
            <h2>Слідкуй за нами:</h2>

            <div className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/black_pizza/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  width="44"
                  height="44"
                />
              </a>

              <a
                href="https://www.youtube.com/@black_pizza"
                target="_blank"
                rel="noreferrer"
              >
                <img src={youtubeIcon} alt="YouTube" width="44" height="44" />
              </a>

              <a
                href="https://www.tiktok.com/@pizza_black"
                target="_blank"
                rel="noreferrer"
              >
                <img src={tiktokIcon} alt="TikTok" width="44" height="44" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
