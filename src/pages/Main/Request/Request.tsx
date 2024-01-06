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
import { EditorVariablesHeaders } from './components/EditorVariablesHeaders/EditorVariablesHeaders';
import { MirrorEditor } from './components/MirrorEditor/MirrorEditor';
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

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    },
    [baseUrl, dispatch, getResponse, headers, query, variables]
  );

  const handlePrettify = useCallback(() => {
    dispatch(
      setQuery(
        prettifyData(removeTrailingSpacesEnterComments(query), {
          mode: 'request',
        })
      )
    );
    dispatch(
      setVariables(
        prettifyData(removeTrailingSpacesEnterComments(variables), {
          mode: 'request',
        })
      )
    );
    dispatch(
      setHeaders(
        prettifyData(removeTrailingSpacesEnterComments(headers), {
          mode: 'request',
        })
      )
    );
  }, [dispatch, headers, query, variables]);

  return (
    <section className={styles.request} data-testid="request">
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
          data-testid="submitButton"
          className={`button button_colored button_square`}
          onClick={(e) => handleSubmit(e)}
        >
          &#9654;
        </button>
        <button
          type="button"
          data-testid="prettifyButton"
          className={`button button_colored button_square ${styles.button_prettify}`}
          onClick={handlePrettify}
        ></button>
      </div>
    </section>
  );
};

export { Request };
