import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import CheckToken from "../../components/CheckToken";
import { ReactComponent as ArrowUpSVG } from "../../assets/arrow up.svg";
import { ReactComponent as Picture4SVG } from "../../assets/picture4.svg";
import styles from "./ResultsPage.module.scss";
import ReportSlider from "../../components/ReportSlider/ReportSlider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PublicationService from "../../services/PublicationService";
import DocumentArticle from "../../components/DocumentArticle/DocumentArticle";

export default function ResultsPage() {
    const histogramLoadedDate = useSelector(state => state.publications.histogramLoadedDate);
    const publicationsList = useSelector(state => state.publications.publicationsList);

    const navigate = useNavigate();
    const showMoreBtnRef = useRef();
    const top = useRef();

    const [remainingPublications, setRemainingPublications] = useState(0);

    const [loadedDocs, setLoadedDocs] = useState([]);
    const [isError, setError] = useState(false);

    const onShowMoreBtnClick = () => {
        loadDocuments(publicationsList.length - remainingPublications + 1, 10, remainingPublications);
    }

    const onUpBtnClick = () => {
        top.current.scrollIntoView();
    }

    function loadDocuments(indexOf, count = 10, remaining = 10) {
        indexOf--;

        const newRemainingCount = remaining - count;

        if (newRemainingCount > 0) {
            setRemainingPublications(newRemainingCount);
        } else {
            count += newRemainingCount;
            setRemainingPublications(0);
        }

        if (showMoreBtnRef.current && remainingPublications === publicationsList.length)
            showMoreBtnRef.current.disabled = true;

        PublicationService.getDocuments(publicationsList.slice(indexOf, indexOf + count).map(x => x.encodedId))
            .then(response => {
                console.log(response);
                setLoadedDocs(loadedDocs.concat(response.data));
                setError(false);
            })
            .catch(() => {
                setLoadedDocs([]);
                setError(true);
            })
            .finally(() => {
                if (showMoreBtnRef.current)
                    showMoreBtnRef.current.disabled = false;
            });
    }

    useEffect(() => {
        if (histogramLoadedDate === null)
            navigate("/");
    }, [histogramLoadedDate, navigate]);

    useEffect(() => {
        if (publicationsList) {
            loadDocuments(1, 10, publicationsList.length); 
        } // eslint-disable-next-line
    }, [publicationsList]); 

    return (
        <>
            <CheckToken unauthRedirect="/auth" />

            <Header />

            <main className={styles.content}>
                <h1 ref={top}>
                    Ищем. Скоро <br />
                    будут результаты
                </h1>

                <h4>
                    Поиск может занять некоторое время, <br />
                    просим сохранять терпение.
                </h4>

                <Picture4SVG className={styles.picture} />

                <section className={styles.report}>
                    <h2>
                        Общая сводка
                    </h2>
                    
                    <div className={styles.count}>
                        <span>Найдено <span>{publicationsList?.length ? publicationsList.length : "..."}</span> вариантов</span>
                    </div>

                    <ReportSlider />
                </section>

                {(loadedDocs.length > 0 && !isError) &&
                    <section className={styles.documents}>
                        <h2>
                            Список документов
                        </h2>

                        <div className={styles.documents__wrapper}>
                            {loadedDocs.map(x => 
                                <DocumentArticle data={x.ok} key={x.ok.id} />
                            )}
                        </div>

                        <div className={styles.buttons}>
                            {remainingPublications > 0 &&
                                <button className={styles.show_more_button} ref={showMoreBtnRef} onClick={onShowMoreBtnClick}>Показать больше</button>
                            }
                            <ArrowUpSVG className={remainingPublications > 0 ? styles.up_button : styles.up_button__only} onClick={onUpBtnClick} />
                        </div>
                    </section>
                }

                {isError && 
                    <div className={styles.error}>
                        <h2>
                            Ошибка поиска публикаций.
                        </h2>
                        <h3>Возможно, публикаций, соответствуюших Вашему запросу, нет.</h3>
                        <button className={styles.error_button}>
                            <a href="/search">
                                <span>К поиску</span>
                            </a>
                        </button>
                    </div>
                }
            </main>

            <Footer />
        </>
    );
}