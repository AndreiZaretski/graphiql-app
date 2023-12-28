import ChangeLanguage from '@components/ChangeLanguage/ChangeLanguage';
import styles from './Header.module.scss';
import Auth from '@layout/Auth/Auth';
import { RoutesPath } from '@type/enums/routes.enum';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import { UserContext } from '@context/AuthContext';
import logo from '@assets/icons/logo.svg';

const Header = () => {
  const {
    data: {
      auth: { main, welcome },
    },
  } = useContext(LanguageContext);
  const { user } = useContext(UserContext) || {};

  const [isActive, setIsActive] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const isScrolled = offset > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <header
        className={
          scrolled ? `${styles.header} ${styles.scrolled}` : styles.header
        }
      >
        <div className="container">
          <div className={styles.header_wrapper}>
            <div className={styles.dummy}></div>
            <img src={logo} alt="logo" className={styles.header_logo} />
            <div
              className={
                isActive
                  ? `${styles.navigation_wrapper} ${styles.navigation__wrapper_active}`
                  : styles.navigation_wrapper
              }
            >
              <nav>
                <ul className={styles.navigation}>
                  <li className={styles.navigation__item}>
                    <Link to={RoutesPath.Welcome} className="link">
                      {welcome}
                    </Link>
                  </li>
                  {user ? (
                    <li className={styles.navigation__item}>
                      <Link to={RoutesPath.Main} className="link">
                        {main}
                      </Link>
                    </li>
                  ) : null}
                  <Auth />
                  <li className={styles.navigation__item}>
                    <ChangeLanguage />
                  </li>
                </ul>
              </nav>
              <div
                className={styles.navigation__overlay}
                onClick={() => handleToggle()}
              ></div>
            </div>
          </div>
          <div
            className={
              isActive
                ? `${styles.hamburger} ${styles.hamburger_active}`
                : styles.hamburger
            }
            onClick={() => {
              handleToggle();
            }}
          >
            <span className={styles.hamburger_icon}></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
