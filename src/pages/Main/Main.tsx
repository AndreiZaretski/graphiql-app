import { lazy, Suspense, useContext } from 'react';
import Layout from '@layout/Layout';
import Request from './Request/Request';
import Response from './Response/Response';
const Documentation = lazy(() => import('./Documentation/Documentation'));
import './Main.module.scss';

import { RequestParams } from '@type/interfaces/props.interface';
import { AppState } from '@store/store';
import { useSelector } from 'react-redux';
import {
  useGetDocumentationMutation,
  useSearchByQueryMutation,
} from '@store/api/graphiqlApi';
import ChangeApi from './Request/components/ChangeApi/ChangeApi';
import { LanguageContext } from '@context/LanguageContext';
import styles from './Main.module.scss';
import Spinner from '@components/Spinner/Spinner';

const Main = () => {
  const [getResponseMutation, { isLoading: isFetching, data, error }] =
    useSearchByQueryMutation();
  const [getDocumentationMutation, { isLoading: isFetchingDoc, data: schema }] =
    useGetDocumentationMutation();

  const { baseUrl, validHeaderJson, validVariableJson } = useSelector(
    (state: AppState) => state.request
  );

  const getResponse = async (value: RequestParams) => {
    await getResponseMutation(value);
  };

  const getDocumentation = async () => {
    await getDocumentationMutation(baseUrl);
  };

  const {
    data: {
      mainPage: {
        loading,
        doc,
        validHeaderMessage,
        validVariableMessage,
        errorCorsMessage,
      },
    },
  } = useContext(LanguageContext);

  const errorJSON = () => {
    let error: string | string[] = '';
    if (validHeaderJson) {
      error = validHeaderMessage;
    }

    if (validVariableJson) {
      error = validVariableMessage;
    }

    if (validVariableJson && validHeaderJson) {
      error = [validVariableMessage, validHeaderMessage];
    }

    return error;
  };

  let errorMessage: unknown | undefined | unknown[] = undefined;

  if (error && 'data' in error) {
    errorMessage = error.data;
  }

  if (error && !('data' in error)) {
    errorMessage = [errorCorsMessage, error];
  }

  return (
    <>
      {isFetching && <Spinner />}
      {isFetchingDoc && <Spinner />}
      <Layout>
        <ChangeApi />
        <div className={styles.code_wrapper}>
          <Request getResponse={getResponse} />
          <Response data={errorJSON() || data?.data || errorMessage || {}} />

          <button type="submit" onClick={getDocumentation}>
            {doc}
          </button>
          {schema && (
            <Suspense fallback={<div>{loading}</div>}>
              <Documentation schema={schema} />
            </Suspense>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Main;
