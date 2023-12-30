import { useCallback } from 'react';
import { RequestProps } from '@type/interfaces/props.interface';
import {
  prettifyData,
  removeTrailingSpacesEnterComments,
} from '@utils/prettify/prettify';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHeaders,
  setQuery,
  setVariables,
  setValidHeaderJson,
  setValidVariableJson,
} from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { IsJsonString } from '@utils/isJsonString';
import EditorVariablesHeaders from './components/EditorVariablesHeaders/EditorVariablesHeaders';
import MirrorEditor from './components/MirrorEditor/MirrorEditor';
import styles from './Request.module.scss';

const Request = (props: RequestProps) => {
  const { getResponse } = props;

  const { query, variables, headers, baseUrl } = useSelector(
    (state: AppState) => state.request
  );

  const dispatch = useDispatch();

  const onChangeQuery = useCallback(
    (value: string) => {
      dispatch(setQuery(value));
    },
    [dispatch]
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(setValidVariableJson(IsJsonString(variables)));
    dispatch(setValidHeaderJson(IsJsonString(headers)));

    if (IsJsonString(headers) && IsJsonString(variables)) {
      const newHeaders = headers
        ? new Headers(JSON.parse(headers))
        : new Headers();
      const newVariables = variables ? JSON.parse(variables) : {};

      getResponse({
        query,
        variables: newVariables,
        headers: newHeaders,
        baseUrl,
      });
    }
  };

  const handlePrettify = () => {
    dispatch(setQuery(prettifyData(removeTrailingSpacesEnterComments(query))));
    dispatch(
      setVariables(prettifyData(removeTrailingSpacesEnterComments(variables)))
    );
    dispatch(
      setHeaders(prettifyData(removeTrailingSpacesEnterComments(headers)))
    );
  };

  return (
    <section className={styles.request}>
      <MirrorEditor
        height="500px"
        value={query}
        onChange={onChangeQuery}
        editable={true}
      />
      <EditorVariablesHeaders />
      <div className={styles.request__buttons}>
        <button
          type="submit"
          className={`button button_colored button_square`}
          onClick={(e) => handleSubmit(e)}
        >
          &#9654;
        </button>
        <button
          type="button"
          className={`button button_colored button_square ${styles.button_prettify}`}
          onClick={handlePrettify}
        ></button>
      </div>
    </section>
  );
};

export default Request;
