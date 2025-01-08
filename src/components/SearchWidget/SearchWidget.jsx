import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as RectSVG } from "../../assets/rect.svg";
import { Listbox } from "@headlessui/react";
import styles from "./SearchWidget.module.scss";
import 'react-day-picker/dist/style.css';
import DateRangeInputs from "./DateRangeInputs/DateRangeInputs";
import { validateInn } from "../../validation";
import PublicationService from "../../services/PublicationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistogram, setHistogramDate, setPublicationsList } from "../../storage/actions";

export default function SearchWidget() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tonOptions = [
        { value: 'any', label: 'Любая' },
        { value: 'negative', label: 'Негативная' },
        { value: 'positive', label: 'Позитивная' }
    ];

    const [isInnError, setInnError] = useState(false);
    const docsCountRef = useRef();
    const [isDocsCountError, setDocsCountError] = useState(false);
    const [isDateRangeError, setDateRangeError] = useState(false);
    const [selectedTonOption, setSelectedTonOption] = useState(tonOptions[0]);

    const defaultStartDateText = "Дата начала";
    const defaultEndDateText = "Дата конца";

    const [selectedStartDate, setSelectedStartDate] = useState(defaultStartDateText);
    const [selectedEndDate, setSelectedEndDate] = useState(defaultEndDateText);

    const [checkMaxFullnessState, setCheckMaxFullnessState] = useState(true);
    const [checkInBusinessNewsState, setCheckInBusinessNewsState] = useState(true);
    const [checkOnlyMainRoleState, setCheckOnlyMainRoleState] = useState(true);
    const [check4State, setCheck4State] = useState(false);
    const [check5State, setCheck5State] = useState(false);
    const [checkExcludeAnnouncementsState, setCheckExcludeAnnouncementsState] = useState(true);
    const [check7State, setCheck7State] = useState(false);

    const searchBtnRef = useRef();

    const onInnInputChange = (event) => {
        if (event.target.value.length >= 10) {
            setInnError(!validateInn(event.target.value));
        } else {
            setInnError(false);
            }
        validate();
    }

    const onInnInputBlur = (event) => {
        if (!isInnError)
            setInnError(!validateInn(event.target.value));
        
        validate();
    }

    const onDocsCountInputChange = (event) => {
        const num = event.target.value;
        if (num > 1000 || num.length > 4)
            docsCountRef.current.value = "1000";
        if (num === "0" || num < 0 || num === "-0")
            docsCountRef.current.value = "1";

        setDocsCountError(!num);
        validate();
    }

    const onDocsCountInputBlur = () => {
        validate();
    }

    async function onSearchBtnClick() {
        const inn = document.getElementById("innNumber").value;
        const tonality = selectedTonOption.value;
        const limit = docsCountRef.current.value;
        
        searchBtnRef.current.disabled = true;

        dispatch(setHistogramDate(undefined));
        dispatch(setPublicationsList(undefined));
        navigate("/results");

        await PublicationService.getHistograms(inn, tonality, limit, 
            selectedStartDate, selectedEndDate, checkMaxFullnessState, 
            checkInBusinessNewsState, checkOnlyMainRoleState, checkExcludeAnnouncementsState)
            .then(response => {
                dispatch(setHistogram(response));
            })
            .catch(response => {
                console.log("Error. " + JSON.stringify(response));
            });

        await PublicationService.getPublicationsList(inn, tonality, limit, 
            selectedStartDate, selectedEndDate, checkMaxFullnessState, 
            checkInBusinessNewsState, checkOnlyMainRoleState, checkExcludeAnnouncementsState)
            .then(response => {
                dispatch(setPublicationsList(response.data.items));
            })
            .catch(response => {
                console.log("Error. " + JSON.stringify(response))
            });
    }

    const [isCompleted, setIsCompleted] = useState(false);

    const validate = () => {
        const inn = document.getElementById("innNumber");
        
        setIsCompleted(!isInnError && !isDocsCountError && !isDateRangeError && 
            docsCountRef.current.value &&
            inn?.value && inn?.value.length >= 10 &&
            selectedStartDate !== defaultStartDateText && selectedEndDate !== defaultEndDateText);
    }

    useEffect(validate);

    return (
        <section className={styles.parent}>
            <div className={styles.wrapper}>
                <div className={styles.inputs}>
                    <span>ИНН компании<sup className={isInnError ? styles.sup__error : ""}>*</sup></span>
                    <input id="innNumber" className={isInnError ? styles.input__error : ""} onBlur={onInnInputBlur} onChange={onInnInputChange} type="text" placeholder="10 цифр" maxLength={10} />
                    {isInnError && <span className={styles.error_label}>Введите корректные данные</span>}
                    
                    <span>Тональность</span>
                    <Listbox value={selectedTonOption} onChange={setSelectedTonOption}>
                        <div className={styles.listbox_wrapper}>
                            <Listbox.Button className={styles.listbox_button}>
                                {({ open }) => (
                                    <div className={styles.listbox_button__wrapper}>
                                        {selectedTonOption.label}
                                        <RectSVG className={open ? styles.rect__active : styles.rect} />
                                    </div>
                                )}
                            </Listbox.Button>

                            <Listbox.Options className={styles.listbox_options}>
                                {tonOptions.map((option) => (
                                    <Listbox.Option
                                        key={"listbox-item__" + option.value}
                                        value={option}
                                        className={styles.listbox_option}
                                    >
                                        <span>{option.label}</span>
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>

                    <span>Количество документов к выдаче<sup className={isDocsCountError ? styles.sup__error : ""}>*</sup></span>
                    <input ref={docsCountRef} id="docsCount" className={isDocsCountError ? styles.input__error : ""} onChange={onDocsCountInputChange} onBlur={onDocsCountInputBlur} type="number" placeholder="От 1 до 1000" min="1" max="1000" />
                    {isDocsCountError && <span className={styles.error_label} target="docsCount">Обязательное поле</span>}

                    <span>Диапазон поиска<sup className={isDateRangeError ? styles.sup__error : ""}>*</sup></span>
                    <div className={styles.range_inputs}>
                        <div className={styles.range_inputs__wrapper}>
                            <DateRangeInputs selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate} isError={isDateRangeError} setError={setDateRangeError} />
                        </div>
                        {isDateRangeError && <span className={styles.error_label} target="dateRange">Введите корректные данные</span>}
                    </div>
                </div>

                <div className={styles.checkboxes}>
                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="1" name="1" checked={checkMaxFullnessState} onChange={event => setCheckMaxFullnessState(event.currentTarget.checked)} />
                        <label htmlFor="1">Признак максимальной полноты</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="2" name="2" checked={checkInBusinessNewsState} onChange={event => setCheckInBusinessNewsState(event.currentTarget.checked)} />
                        <label htmlFor="2">Упоминания в бизнес-контексте</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="3" name="3" checked={checkOnlyMainRoleState} onChange={event => setCheckOnlyMainRoleState(event.currentTarget.checked)} />
                        <label htmlFor="3">Главная роль в публикации</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="4" name="4" checked={check4State} onChange={event => setCheck4State(event.currentTarget.checked)} disabled />
                        <label htmlFor="4">Публикации только с риск-факторами</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="5" name="5" checked={check5State} onChange={event => setCheck5State(event.currentTarget.checked)} disabled />
                        <label htmlFor="5">Включать технические новости рынков</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="6" name="6" checked={checkExcludeAnnouncementsState} onChange={event => setCheckExcludeAnnouncementsState(event.currentTarget.checked)} />
                        <label htmlFor="6">Включать анонсы и календари</label>
                    </div>

                    <div className={styles.checkbox__wrapper}>
                        <input type="checkbox" id="7" name="7" checked={check7State} onChange={event => setCheck7State(event.currentTarget.checked)} disabled />
                        <label htmlFor="7">Включать сводки новостей</label>
                    </div>
                </div>

                <div className={styles.button_wrapper}>
                    <button className={styles.search_button} ref={searchBtnRef} onClick={onSearchBtnClick} disabled={!isCompleted}>Поиск</button>
                    <span>*Обязательные к заполнению поля</span>
                </div>
            </div>
        </section>
    );
}