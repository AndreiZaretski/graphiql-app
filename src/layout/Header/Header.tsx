import ChangeLanguage from '@components/ChangeLanguage/ChangeLanguage';
import styles from './Header.module.scss';
import Auth from '@layout/Auth/Auth';
import { RoutesPath } from '@type/enums/routes.enum';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import { UserContext } from '@context/AuthContext';
import logo from '../../icons/logo.svg';

const Header = () => {
  const {
    data: {
      auth: { main, welcome },
    },
  } = useContext(LanguageContext);
  const { user } = useContext(UserContext) || {};

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
            <div className={styles.navigation_wrapper}>
              <Link to={RoutesPath.Welcome} className="link">
                {welcome}
              </Link>
              {user ? (
                <Link to={RoutesPath.Main} className="link">
                  {main}
                </Link>
              ) : null}
            </div>
            <div className={styles.auth_wrapper}>
              <ChangeLanguage />
              <Auth />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
