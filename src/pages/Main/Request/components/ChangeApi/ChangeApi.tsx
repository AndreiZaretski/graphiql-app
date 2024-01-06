import { LanguageContext } from '@context/LanguageContext';
import { setBaseUrl } from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { isValidUrl } from '@utils/validationUrl';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ChangeApi.module.scss';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  MutationDefinition,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { IntrospectionSchema } from 'graphql';
import arrowUp from '@assets/icons/arrow-up.png';
import arrowDown from '@assets/icons/arrow-down.png';
import arrowLeft from '@assets/icons/arrow-left.png';
import arrowRight from '@assets/icons/arrow-right.png';

interface ChangeApiProps {
  getDocumentationMutation: MutationTrigger<
    MutationDefinition<
      string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      never,
      IntrospectionSchema,
      'graphiqlApi'
    >
  >;
}

const ChangeApi: React.FC<ChangeApiProps> = ({ getDocumentationMutation }) => {
  const { baseUrl } = useSelector((state: AppState) => state.request);

  const [inputBaseUrl, setInputBaseUrl] = useState(baseUrl);
  const [hasMessageUrl, setHasMessageUrl] = useState(false);

  const [hasShowBlockChange, setHasShowBlockChange] = useState(false);
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);

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

  const handleClickBaseUrl = async () => {
    if (isValidUrl(inputBaseUrl)) {
      dispatch(setBaseUrl(inputBaseUrl));
      setHasMessageUrl(false);
      setHasShowBlockChange(false);
      showSuccesMessage();
      await getDocumentationMutation(inputBaseUrl);
    } else {
      setHasMessageUrl(true);
    }
  };

  const showSuccesMessage = () => {
    setHasSuccessMessage(true);
    setTimeout(() => {
      setHasSuccessMessage(false);
    }, 5000);
  };

  const toggleBlockChange = (prev: boolean) => {
    setHasShowBlockChange(!prev);
  };

  const showHideText = () => {
    if (window.innerWidth < 576) {
      return hasShowBlockChange ? arrowUp : arrowDown;
    }
    return hasShowBlockChange ? arrowLeft : arrowRight;
  };

  return (
    <div className={styles.change_api}>
      <p className={styles.current_url_text}>
        {currentUrl}
        {window.innerWidth < 576 && <br />}
        <b> {baseUrl}</b>
      </p>
      <div className={styles.replace_url}>
        <p>{changeApi} </p>
        {hasShowBlockChange && (
          <div className={styles.hide_block}>
            <input
              type="text"
              data-testid="inputUrl"
              className={styles.input_url}
              value={inputBaseUrl}
              onChange={handleChangeBaseUrl}
              placeholder="Enter baseUrl"
            />
            <button
              type="button"
              data-testid="changeUrl"
              className={`button button_colored ${styles.change_api__button}`}
              onClick={handleClickBaseUrl}
            >
              {changeApiBtn}
            </button>
          </div>
        )}
        <button
          className="button button_square hide_block__button"
          data-testid="toggleButton"
          onClick={() => toggleBlockChange(hasShowBlockChange)}
        >
          <img src={showHideText()} alt="arrow" />
        </button>
      </div>
      {hasMessageUrl && (
        <p className={`${styles.message} ${styles.error_url}`} role="message">
          {validUrlMessage}
        </p>
      )}
      {hasSuccessMessage && (
        <p
          className={`${styles.message} ${styles.success_message}`}
          role="message"
        >
          {successChangeUrlMessage}
        </p>
      )}
      {!hasSuccessMessage && !hasMessageUrl && (
        <p className={styles.message}> </p>
      )}
    </div>
  );
};

export { ChangeApi };
