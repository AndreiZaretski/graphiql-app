import ChangeLanguage from '@components/ChangeLanguage/ChangeLanguage';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h2>Header work!</h2>
        <ChangeLanguage />
      </header>
    </>
  );
};

export default Header;
