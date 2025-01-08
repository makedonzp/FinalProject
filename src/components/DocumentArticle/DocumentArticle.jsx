import React from "react";
import styles from "./DocumentArticle.module.scss";
import { getNoun } from "../../validation";
import HTMLReactParser from "html-react-parser";

export default function DocumentArticle({ data }) {
    let markup = data.content.markup;

    markup =  markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">")
                    .replaceAll("<scandoc>", `<div>`)
                    .replaceAll("</scandoc>", "</div>")
                    .replaceAll("<p>", "<span>").replaceAll("</p>", "</span>")
                    .replaceAll("<sentence>", "<p>").replaceAll("</sentence>", "</p>")
                    .replaceAll("<entity", "<span").replaceAll("</entity>", "</span>")
                    .replaceAll("<speech", "<span").replaceAll("</speech>", "</span>")
                    .replaceAll("<vue", "<span").replaceAll("</vue>", "</span>")
                    .replaceAll("<br>", "");

    while (markup.includes("<figure>")) {
        let figureHTML = markup.substring(markup.indexOf("<figure>"));
        figureHTML = figureHTML.substring(0, figureHTML.indexOf("</figure>") + "</figure>".length);

        if (!figureHTML.includes("data-image-src")) {
            markup = markup.replace(figureHTML, "");
            continue;
        }

        let url = figureHTML.substring(figureHTML.indexOf("data-image-src") + "data-image-src=\"".length);
        url = url.substring(0, url.indexOf("\""));

        if (url.includes("span")) console.log(figureHTML);
        markup = markup.replace(figureHTML, `<img src="${url}" alt="Фото из публикации">`);
    }

    while (markup.includes("<span></span>"))
        markup = markup.replace("<span></span>", "");

    while (markup.includes("<p></p>"))
        markup = markup.replace("<p></p>", "");

    if (markup.length > 1800) {
        markup = markup.substring(0, markup.lastIndexOf("</p>", 1700) + "</p>".length);
        markup += "...";
    }

    markup = HTMLReactParser(markup, "text/xml");

    return (
        <article className={styles.document}>
            <div className={styles.document__wrapper}>
                <div className={styles.header}>
                    <span className={styles.date}>{new Date(data.issueDate).toLocaleDateString().replace("/", ".")}</span>
                    <a href={data.url} target="_blank" rel="noreferrer">
                        <span className={styles.sourceName}>{data.source.name}</span>
                    </a>
                </div>

                <h1>
                    {data.title.text}
                </h1>

                {data.attributes.isTechNews &&
                    <div className={styles.category__yellow}>
                        <span>Технические новости</span>
                    </div>
                }

                {data.attributes.isAnnouncement &&
                    <div className={styles.category__green}>
                        <span>Анонсы и события</span>
                    </div>
                }

                {data.attributes.isDigest &&
                    <div className={styles.category__blue}>
                        <span>Сводки новостей</span>
                    </div>
                }

                {(!data.attributes.isTechNews && 
                  !data.attributes.isAnnouncement && 
                  !data.attributes.isDigest) &&
                    <div className={styles.category__gray}>
                        <span>Без категории</span>
                    </div>
                }

                <div className={styles.content}>
                    {markup}
                </div>

                <div className={styles.footer}>
                    <button className={styles.btn}>
                        <a href={data.url} target="_blank" rel="noreferrer">
                            <span>Читать в источнике</span>
                        </a>
                    </button>

                    <span className={styles.word_count}>
                        {data.attributes.wordCount} {getNoun(data.attributes.wordCount, "слово", "слова", "слов")}
                    </span>
                </div>
            </div>
        </article>
    );
}