import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// ✔ нові правильні шляхи до картинок
import banner1 from "../../assets/img/baner1.webp";
import banner2 from "../../assets/img/baner2.webp";
import banner3 from "../../assets/img/baner3.webp";

import styles from "./Slider.module.scss";

const Slider = () => {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(sliderRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: paginationRef.current,
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${styles.bullet} ${className}"></span>`,
      },
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <div className={styles.sliderWrapper}>
      <div className="swiper" ref={sliderRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={banner1} alt="Slide 1" className={styles.banner} />
          </div>
          <div className="swiper-slide">
            <img src={banner2} alt="Slide 2" className={styles.banner} />
          </div>
          <div className="swiper-slide">
            <img src={banner3} alt="Slide 3" className={styles.banner} />
          </div>
        </div>

        <div className={styles.customPagination} ref={paginationRef}></div>
      </div>
    </div>
  );
};

export default Slider;
