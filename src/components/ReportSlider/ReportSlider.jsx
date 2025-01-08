import React from "react";
import { ReactComponent as ArrowSVG } from "../../assets/arrow.svg";
import { ReactComponent as ArrowActiveSVG } from "../../assets/arrow active.svg";
import { ReactComponent as SpinnerSVG } from "../../assets/spinner.svg";
import Slider from "react-slick";
import styles from "./ReportSlider.module.scss";
import { useSelector } from "react-redux";

export default function ReportSlider() {
    const histogram = useSelector(state => state.publications.histogram);
    const histogramLoadedDate = useSelector(state => state.publications.histogramLoadedDate);

    const PrevArrow = ({ currentSlide, slideCount, ...props }) => 
        <button {...props}>
            {(currentSlide === 0 &&
                <ArrowSVG className={styles.arrow_prev} style={{cursor: "default"}} />)
                ||
                <ArrowActiveSVG className={styles.arrow_prev} />
            }
        </button>;

    const NextArrow = ({ currentSlide, slideCount, ...props }) =>
        <button {...props}>
            {(currentSlide >= slideCount - 1 &&
                <ArrowSVG className={styles.arrow_next} style={{cursor: "default"}} />)
                ||
                <ArrowActiveSVG className={styles.arrow_next} />
            }
        </button>;

    const slider_settings = {
        className: styles.slider__wrapper,
        speed: 250,
        infinite: false,
        variableWidth: true,
        focusOnSelect: true,
        swipe: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

        responsive: [
            {
                breakpoint: 767,
                settings: {
                    speed: 400,
                    slidesToShow: 1,
                    variableWidth: false
                }
            }
        ]
    };

    return (
        <div className={styles.slider}>
            <div className={styles.header}>
                <span>Период</span>
                <span>Всего</span>
                <span>Риски</span>
            </div>

            {(histogramLoadedDate && 
                <Slider {...slider_settings}>
                    {histogram.map(x => 
                        <div className={styles.item} key={x.date}>
                            <div className={styles.item__wrapper}>
                                <span>{new Date(x.date).toLocaleDateString().replace("/", ".")}</span>
                                <span>{x.total}</span>
                                <span>{x.riskFactors}</span>
                            </div>
                        </div>
                    )}
                </Slider>)
                ||
                <div className={styles.spinner__wrapper}>
                    <SpinnerSVG className={styles.spinner} />
                    <span>Загружаем данные</span>
                </div>
            }
        </div>
    );
}