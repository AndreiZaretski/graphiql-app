import { LanguageContext } from '@context/LanguageContext';
import { setBaseUrl } from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { isValidUrl } from '@utils/validationUrl';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ChangeApi.module.scss';

const ChangeApi = () => {
  const { baseUrl } = useSelector((state: AppState) => state.request);

  const [inputBaseUrl, setInputBaseUrl] = useState(baseUrl);
  const [hasMessageUrl, setHasMessageUrl] = useState(false);

  const [hasShowBlockChange, setHasShowBlockChange] = useState(false);
  const [hasSuccesMessage, setHasSuccesMessage] = useState(false);

  const dispatch = useDispatch();

  const {
    data: {
      mainPage: {
        changeApi,
        changeApiBtn,
        validUrlMessage,
        currentUrl,
        successChangeUrlMessage,
      },
    },
  } = useContext(LanguageContext);

  const handleChangeBaseUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBaseUrl(e.target.value);
  };

  const handleClickBaseUrl = () => {
    if (isValidUrl(inputBaseUrl)) {
      dispatch(setBaseUrl(inputBaseUrl));
      setHasMessageUrl(false);
      setHasShowBlockChange(false);
      showSuccesMessage();
    } else {
      setHasMessageUrl(true);
    }
  };

  const showSuccesMessage = () => {
    setHasSuccesMessage(true);
    setTimeout(() => {
      setHasSuccesMessage(false);
    }, 5000);
  };

  const toggleBlockChange = (prev: boolean) => {
    setHasShowBlockChange(!prev);
  };

  const showHideText = () => {
    if (window.innerWidth < 576) {
      return hasShowBlockChange ? '⮝' : '⮟';
    }
    return hasShowBlockChange ? '❮' : '❯';
  };

  return (
    <div className={styles.change_api}>
      <p className={styles.current_url_text}>
        {currentUrl}
        <b> {baseUrl}</b>
      </p>
      <div className={styles.replace_url}>
        <p>{changeApi} </p>
        {hasShowBlockChange && (
          <div className={styles.hide_block}>
            <input
              type="text"
              className={styles.input_url}
              value={inputBaseUrl}
              onChange={handleChangeBaseUrl}
              placeholder="Enter baseUrl"
            />
            <button
              type="button"
              className={`button button_colored ${styles.change_api__button}`}
              onClick={handleClickBaseUrl}
            >
              {changeApiBtn}
            </button>
          </div>
        )}
        <button
          className={`button ${styles.hide_block__button}`}
          onClick={() => toggleBlockChange(hasShowBlockChange)}
        >
          {showHideText()}
        </button>
      </div>
      {hasMessageUrl && (
        <p className={`${styles.message} ${styles.error_url}`}>
          {validUrlMessage}
        </p>
      )}
      {hasSuccesMessage && (
        <p className={`${styles.message} ${styles.success_message}`}>
          {successChangeUrlMessage}
        </p>
      )}
      {!hasSuccesMessage && !hasMessageUrl && (
        <p className={styles.message}> </p>
      )}
    </div>
  );
};

export { ChangeApi };
