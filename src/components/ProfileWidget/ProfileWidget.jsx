import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AvatarSVG } from "../../assets/avatar.svg";
import { ReactComponent as SpinnerSVG } from "../../assets/spinner.svg";
import styles from "./ProfileWidget.module.scss";
import { useDispatch, useSelector } from "react-redux";
import AccountService from "../../services/AccountService";
import { setAccountInfo, setAuth } from "../../storage/actions";

export default function ProfileWidget() {
  const isAuth = useSelector((state) => state.account.isAuth);
  const usedCompanyCount = useSelector(
    (state) => state.account.usedCompanyCount
  );
  const companyLimit = useSelector((state) => state.account.companyLimit);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (isAuth && usedCompanyCount === undefined) {
        AccountService.getInfo().then((response) => {
          const data = response.data.eventFiltersInfo;
          dispatch(setAccountInfo(data.usedCompanyCount, data.companyLimit));
        });
      }
    },
    [dispatch, isAuth, usedCompanyCount] // Добавьте зависимости здесь
  );

  return (
    <>
      {(isAuth && (
        <div className={styles.parent__auth}>
          <div className={styles.info}>
            {(usedCompanyCount === undefined && (
              <SpinnerSVG className={styles.spinner} />
            )) || (
              <>
                <div className={styles.info__vert_wrapper1}>
                  <span className={styles.label}>Использовано компаний</span>
                  <span className={styles.label}>Лимит по компаниям</span>
                </div>

                <div className={styles.info__vert_wrapper2}>
                  <span className={styles.num1}>{usedCompanyCount}</span>
                  <span className={styles.num2}>{companyLimit}</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.avatar__wrapper}>
            <div className={styles.username__wrapper}>
              <span className={styles.username}>Алексей А.</span>
              <button
                className={styles.exit_button}
                onClick={() => dispatch(setAuth(false))}
              >
                Выйти
              </button>
            </div>

            <AvatarSVG className={styles.avatar} />
          </div>
        </div>
      )) || (
        <div className={styles.parent}>
          <button className={styles.register_button} disabled>
            Зарегистрироваться
          </button>
          <Link to="/auth" className={styles.login_button}>
            Войти
          </Link>
        </div>
      )}
    </>
  );
}
