import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import banner1 from "../../assets/img/baner1.webp";
import banner2 from "../../assets/img/baner2.webp";
import banner3 from "../../assets/img/baner3.webp";

import styles from "./Slider.module.scss";

const Slider = ({ onScrollToItems }) => {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || !paginationRef.current) return;

    const swiper = new SwiperCore(sliderRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      loop: true,
      observer: true,
      observeParents: true,

      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className={styles.sliderWrapper}>
      <div className="swiper" ref={sliderRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={banner1} alt="Slide 1" className={styles.banner} />
            <div className={styles.overlay}>
              <h2>Твій вибір — твої правила</h2>

              <p>
                Розмір, тісто, соуси та начинка —<br />
                створи піцу під свій настрій
              </p>

              <Link to="/product/12" className={styles.cta}>
                Створити піцу
              </Link>
            </div>
          </div>
          <div className="swiper-slide">
            <img src={banner2} alt="Slide 2" className={styles.banner} />
            <div className={styles.overlay}>
              <h2>
                Любиш поїсти?
                <br />
                Велика компанія?
              </h2>

              <p>
                Зроби замовлення від 1000 грн - отримуй
                <br />
                10% знижки на все замовлення
              </p>
              <button onClick={onScrollToItems} className={styles.cta}>
                Обрати піцу
              </button>
            </div>
          </div>
          <div className="swiper-slide">
            <img src={banner3} alt="Slide 3" className={styles.banner} />
            <div className={styles.overlay}>
              <h2>Обирай свій соус</h2>

              <p>
                Класичні та фірмові соуси —<br />
                знайди ідеальне поєднання
              </p>

              <Link to="/souces" className={styles.cta}>
                Перейти до соусів
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.customPagination} ref={paginationRef}></div>
      </div>
    </div>
  );
};

export default Slider;
