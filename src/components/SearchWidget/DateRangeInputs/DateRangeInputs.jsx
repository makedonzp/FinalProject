import React, { useEffect, useState } from "react";
import { ReactComponent as RectSVG } from "../../../assets/rect.svg";
import { Disclosure, FocusTrap } from "@headlessui/react";
import styles from "./DateRangeInputs.module.scss";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';

export default function DateRangeInputs({ selectedStartDate, selectedEndDate, setSelectedStartDate, setSelectedEndDate, isError, setError }) {
    const date = new Date();

    const startDateText = "Дата начала";
    const endDateText = "Дата конца";

    const [isOpenStart, setIsOpenStart] = useState(false);
    const [selectedStartDateText, setSelectedStartDateText] = useState(startDateText);
    const [selectedEndDateText, setSelectedEndDateText] = useState(endDateText);

    const onSelectStartDate = (value) => {
        setSelectedStartDate(value);
        setSelectedStartDateText(new Intl.DateTimeFormat().format(value));
    };

    const onSelectEndDate = (value) => {
        setSelectedEndDate(value);
        setSelectedEndDateText(new Intl.DateTimeFormat().format(value));
    };

    useEffect(() => {
        if (selectedStartDateText !== startDateText && selectedEndDateText !== endDateText) {
            if (selectedStartDate > selectedEndDate || selectedStartDate > date || selectedEndDate > date)
                setError(true);
            else
                setError(false);
        }
    });

    return (
        <>
            {getDatePicker(isError, selectedStartDateText, startDateText, selectedStartDate, onSelectStartDate, "startDate", isOpenStart, setIsOpenStart)}
            {getDatePicker(isError, selectedEndDateText, endDateText, selectedEndDate, onSelectEndDate, "endDate")}
        </>
    );
}

function getDatePicker(isError, value, startText, selectedDate, onSelectDate, dayPickerId, isOpen, setIsOpen) {
    return (
        <Disclosure>
            <div className={styles.disclosure_wrapper}>
                <Disclosure.Button onChange={setIsOpen} className={isError ? styles.disclosure_button__error : styles.disclosure_button}>
                    {({ open }) => (
                        <div className={styles.disclosure_button__wrapper}>
                            <span className={value !== startText ? styles.date_span : ""}>{value}</span>
                            <RectSVG className={open ? styles.date_rect__active : styles.date_rect} />
                        </div>
                    )}
                </Disclosure.Button>

                <Disclosure.Panel className={styles.disclosure_panel}>
                    {({ close }) => (
                        <FocusTrap
                            onMouseLeave={close}
                        >
                            <DayPicker 
                                id={dayPickerId}
                                mode="single" 
                                locale={ru} 
                                selected={selectedDate}
                                onSelect={(value) => {
                                    onSelectDate(value);
                                    close();
                                }}
                                className={styles.rdp}
                            />
                        </FocusTrap>
                    )}
                </Disclosure.Panel>
            </div>
        </Disclosure>
    );
}