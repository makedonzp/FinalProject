import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as Picture1SVG } from "../../assets/picture1.svg";
import { ReactComponent as Picture2SVG } from "../../assets/picture2.svg";
import { ReactComponent as LampSVG } from "../../assets/lamp.svg";
import { ReactComponent as DartsSVG } from "../../assets/darts.svg";
import { ReactComponent as LaptopSVG } from "../../assets/laptop.svg";
import styles from "./MainPage.module.scss";
import InfoSlider from "../../components/InfoSlider/InfoSlider";
import TariffWidget from "../../components/TariffWidget/TariffWidget";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckToken from "../../components/CheckToken";

export default function MainPage() {
    const isAuth = useSelector(state => state.account.isAuth);
    const currentTariff = useSelector(state => state.account.tariff);

    return (
        <>
            <CheckToken unauthRedirect="/" />

            <Header />

            <main className={styles.content}>
                <section className={styles.section1}>
                    <div className={styles.section1__horizontal}>
                        <div className={styles.section1__vertical}>
                            <h1 className={styles.section1__title}>
                                Сервис по поиску<br />
                                публикаций<br />
                                о компании<br />
                                по его ИНН
                            </h1>

                            <span>
                                Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                            </span>
                            
                            <button className={isAuth ? styles.section1__button : styles.section1__button__unvisible}>
                                {isAuth &&
                                    <Link to="/search">
                                        <span>Запросить данные</span>
                                    </Link>
                                }
                            </button>
                        </div>

                        <Picture1SVG className={styles.picture1} />
                    </div>
                </section>

                <section className={styles.section2}>
                    <h2>
                        Почему именно мы
                    </h2>

                    <InfoSlider />

                    <Picture2SVG className={styles.picture2} />
                </section>

                <section className={styles.section3}>
                    <h2>
                        Наши тарифы
                    </h2>

                    <div className={styles.section3__tariffs_wrapper}>
                        <TariffWidget 
                            name="Beginner" 
                            desc="Для небольшого исследования" 
                            svg={<LampSVG className={styles.section3__svg} />} 
                            color="yellow" 
                            price="1200"
                            discount="401"
                            price_desc="или 150 ₽/мес. при рассрочке на 24 мес."
                            tariff_contains={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}

                            current={isAuth && currentTariff === 1}
                        />

                        <TariffWidget 
                            name="Pro" 
                            desc="Для HR и фрилансеров" 
                            svg={<DartsSVG className={styles.section3__svg2} />} 
                            color="azure" 
                            price_desc="или 279 ₽/мес. при рассрочке на 24 мес."
                            tariff_contains={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
                            price="2600"
                            discount="1301"

                            current={isAuth && currentTariff === 2}
                        />

                        <TariffWidget 
                            name="Business" 
                            desc="Для корпоративных клиентов" 
                            svg={<LaptopSVG className={styles.section3__svg3} />} 
                            color="black" 
                            tariff_contains={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
                            price="3700"
                            discount="1321"

                            current={isAuth && currentTariff === 3}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}