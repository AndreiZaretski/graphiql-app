import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import styles from './ChangeLanguage.module.scss';
import { LanguageKey } from '@type/enums/language.enum';

const ChangeLanguage = () => {
  const { setLanguage, language } = useContext(LanguageContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      setLanguage(LanguageKey.Ru);
    } else {
      setLanguage(LanguageKey.En);
    }
  };

  return (
    <>
      <span>{language}</span>
      <label className={styles.switch}>
        <input type="checkbox" onChange={handleChange} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
};

export default ChangeLanguage;
