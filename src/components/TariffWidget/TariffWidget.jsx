import React from "react";
import { ReactComponent as MarkSVG } from "../../assets/mark.svg";
import styles from "./TariffWidget.module.scss";

export default function TariffWidget({ name, desc, svg, color, price, discount, current, price_desc, tariff_contains }) {
    let horizontalClass;
    let parentClass;

    switch (color) {
        case "yellow":
            horizontalClass = styles.horizontal__yellow;
            parentClass = styles.parent__current_yellow;
            break;

        case "azure":
            horizontalClass = styles.horizontal__azure;
            parentClass = styles.parent__current_azure;
            break;

        case "black":
            horizontalClass = styles.horizontal__black;
            parentClass = styles.parent__current_black;
            break;

        default:
            horizontalClass = styles.horizontal;
            parentClass = styles.parent;
    }
    
    if (!tariff_contains) tariff_contains = [];

    return (
        <article className={(!current && styles.parent) || parentClass}>
            <div className={horizontalClass}>
                <div className={styles.vertical}>
                    <h1>{name}</h1>
                    <span>{desc}</span>
                </div>

                {svg}
            </div>

            {current &&
                <div className={styles.current_tariff}>
                    <span>Текущий тариф</span>
                </div>
            }

            <div className={styles.price__wrapper}>
                <span className={styles.discounted_price}>{putSeparator(price - discount)} ₽</span>
                <span className={styles.price}>{putSeparator(price)} ₽</span>
                <span className={styles.price_desc}>{price_desc}</span>
            </div>

            <div className={styles.about__wrapper}>
                <span className={styles.about__title}>В тариф входит:</span>
                {tariff_contains.map(x => 
                    <span key={x}>
                        <MarkSVG className={styles.about__svg} /> {x}
                    </span>
                )}
            </div>

            {(current &&
                <button className={styles.button__current}>Перейти в личный кабинет</button>)
                ||
                <button className={styles.button}>Подробнее</button>
            }
        </article>
    );
}

function putSeparator(number, separator = " ") {
    if (number > 999) {
        number = number.toString();
        return number.substring(0, 1) + separator + number.substring(1);
    }
    
    return number;
}