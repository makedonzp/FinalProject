import React from "react";
import { ReactComponent as LogoSVG } from "../../assets/logo1.svg";
import styles from "./Footer.module.scss";

export default function Footer() {

    return (
        <div className={styles.parent}>
            <div className={styles.footer_wrapper}>
                <LogoSVG className={styles.logo} />
                
                <div className={styles.text}>
                    <p>
                        г. Москва, Цветной б-р, 40 <br />
                        +7 495 771 21 11 <br />
                        info@skan.ru
                    </p>
                    <span>Copyright. {new Date().getFullYear()}</span>
                </div>
            </div>
        </div>
    );
}