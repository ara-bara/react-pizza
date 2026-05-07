import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SauceList from "../../components/Sauce/SauceList";
import styles from "./SaucesPage.module.scss";

import sauceBg from "../../assets/img/sauce-bg.png";

const SaucesPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <Header {...props} />

      <div className={props.cartOpen ? "blur" : ""}>
        <main className={styles.page}>
          <div className={styles.container}>
            <section
              className={styles.hero}
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.75)),
                  url(${sauceBg})
                `,
              }}
            >
              <div className={styles.heroOverlay}>
                <h1>Соуси до піци</h1>

                <p>
                  Обери свій улюблений соус та зроби кожен шматочок ще
                  смачнішим.
                </p>

                <span></span>
              </div>
            </section>

            <SauceList {...props} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SaucesPage;
