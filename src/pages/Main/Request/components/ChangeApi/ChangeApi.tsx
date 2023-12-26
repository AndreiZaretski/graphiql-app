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
        validUrlMessage,
        currentUrl,
        hide,
        show,
        succesChangeUrlMessage,
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
    return hasShowBlockChange ? hide : show;
  };

  return (
    <div className={styles.change_api}>
      <p className={styles.currnt_url_text}>
        {currentUrl}
        <b> {baseUrl}</b>
      </p>
      <div className={styles.replace_url}>
        <p>{changeApi} </p>
        {hasShowBlockChange && (
          <div className={styles.hide_block}>
            <input
              type="text"
              value={inputBaseUrl}
              onChange={handleChangeBaseUrl}
              placeholder="Enter baseUrl"
            />
            <button type="button" onClick={handleClickBaseUrl}>
              {changeApi}
            </button>
          </div>
        )}
        <button onClick={() => toggleBlockChange(hasShowBlockChange)}>
          {showHideText()}
        </button>
      </div>
      {hasMessageUrl && (
        <span className={styles.error_url}>{validUrlMessage}</span>
      )}
      {hasSuccesMessage && (
        <span className={styles.succes_message}>{succesChangeUrlMessage}</span>
      )}
    </div>
  );
};

export default ChangeApi;
