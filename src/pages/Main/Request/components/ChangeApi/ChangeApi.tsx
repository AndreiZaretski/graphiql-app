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

  const dispatch = useDispatch();

  const {
    data: {
      mainPage: { changeApi, validUrlMessage },
    },
  } = useContext(LanguageContext);

  const handleChangeBaseUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBaseUrl(e.target.value);
  };

  const handleClickBaseUrl = () => {
    if (isValidUrl(inputBaseUrl)) {
      dispatch(setBaseUrl(inputBaseUrl));
      setHasMessageUrl(false);
    } else {
      setHasMessageUrl(true);
    }
  };

  return (
    <div className={styles.change_api}>
      <div className={styles.replace_url}>
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
      {hasMessageUrl && (
        <span className={styles.error_url}>{validUrlMessage}</span>
      )}
    </div>
  );
};

export default ChangeApi;
