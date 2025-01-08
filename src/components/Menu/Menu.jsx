import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as AvatarSVG } from "../../assets/avatar.svg";
import styles from "./Menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../storage/actions";

export default function Menu({ onBtnClick }) {
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();

    return (
        <div className={styles.parent}>
            <div className={styles.nav}>
                <NavLink to="/" className={styles.link} onClick={onBtnClick}>Главная</NavLink>
                <NavLink to="/" className={styles.link} onClick={onBtnClick}>Тарифы</NavLink>
                <NavLink to="/" className={styles.link} onClick={onBtnClick}>FAQ</NavLink>
            </div>

            {(isAuth && 
                <div className={styles.avatar__wrapper}>
                    <AvatarSVG className={styles.avatar} />
                    <span className={styles.username}>Алексей Алексеевич</span>
                    <button className={styles.exit_button} onClick={() => dispatch(setAuth(false))}>Выйти</button>
                </div>)
                ||
                <div className={styles.buttons_wrapper}>
                    <button className={styles.register_button} onClick={onBtnClick} disabled>Зарегистрироваться</button>
                    <Link to="/auth" className={styles.login_button} onClick={onBtnClick}>Войти</Link>
                </div>
            }
        </div>
    );
}