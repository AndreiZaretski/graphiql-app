import ChangeLanguage from '@components/ChangeLanguage/ChangeLanguage';
import styles from './Header.module.scss';
import Auth from '@layout/Auth/Auth';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h2>Header work!</h2>
        <ChangeLanguage />
        <Auth />
      </header>
    </>
  );
};

export default Header;
