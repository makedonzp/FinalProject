import React from "react";
import { ReactComponent as WatchSVG } from "../../assets/watch.svg";
import { ReactComponent as SearchSVG } from "../../assets/search.svg";
import { ReactComponent as ProtectSVG } from "../../assets/protect.svg";
import { ReactComponent as ArrowSVG } from "../../assets/arrow.svg";
import Slider from "react-slick";
import styles from "./InfoSlider.module.scss";

export default function InfoSlider() {
    const PrevArrow = ({ currentSlide, slideCount, ...props }) => 
        <button {...props}>
            <ArrowSVG className={styles.slider__arrow_prev} />
        </button>;

    const NextArrow = ({ currentSlide, slideCount, ...props }) =>
        <button {...props}>
            <ArrowSVG className={styles.slider__arrow_next} />
        </button>;

    const slider_settings = {
        className: styles.slider,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3,
        slide: "article",
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...slider_settings}>
            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                    <WatchSVG className={styles.slider__svg} />
                    <span>Высокая и оперативная скорость обработки заявки</span>
                </div>
            </article>

            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                    <SearchSVG className={styles.slider__svg} />
                    <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                </div>
            </article>

            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                    <ProtectSVG className={styles.slider__svg} />
                    <span>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                </div>
            </article>

            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                    <WatchSVG className={styles.slider__svg} />
                    <span>Высокая и оперативная скорость обработки заявки</span>
                </div>
            </article>

            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                    <SearchSVG className={styles.slider__svg} />
                    <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                </div>
            </article>

            <article className={styles.slider__item}>
                <div className={styles.slider__item__wrapper}>
                <ProtectSVG className={styles.slider__svg} />
                <span>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                </div>
            </article>
        </Slider>
    );
}