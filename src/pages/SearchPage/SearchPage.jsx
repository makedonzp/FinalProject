import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as DocumentSVG } from "../../assets/document.svg";
import { ReactComponent as FoldersSVG } from "../../assets/folders.svg";
import { ReactComponent as PictureSVG } from "../../assets/picture3.svg";
import styles from "./SearchPage.module.scss";
import SearchWidget from "../../components/SearchWidget/SearchWidget";
import CheckToken from "../../components/CheckToken";

export default function SearchPage() {
    return (
        <>
            <CheckToken unauthRedirect="/" />

            <Header />
            <main className={styles.content}>
                <h1>
                    Найдите необходимые данные в пару кликов.
                </h1>

                <h2>
                    Задайте параметры поиска. <br />
                    Чем больше заполните, тем точнее поиск
                </h2>

                <SearchWidget />

                <DocumentSVG className={styles.document} />
                <FoldersSVG className={styles.folders} />
                <PictureSVG className={styles.picture} />
            </main>
            <Footer />
        </>
    );
}