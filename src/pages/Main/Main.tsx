import { lazy, Suspense, useCallback, useContext, useState } from 'react';
import { Layout } from '@layout/Layout';
import { Request } from './Request/Request';
import { Response } from './Response/Response';
const Documentation = lazy(() => import('./Documentation/Documentation'));
import './Main.module.scss';

import { RequestParams } from '@type/interfaces/props.interface';
import { AppState } from '@store/store';
import { useSelector } from 'react-redux';
import {
  useGetDocumentationMutation,
  useSearchByQueryMutation,
} from '@store/api/graphiqlApi';
import { ChangeApi } from './Request/components/ChangeApi/ChangeApi';
import { LanguageContext } from '@context/LanguageContext';
import styles from './Main.module.scss';
import Spinner from '@components/Spinner/Spinner';

const Main = () => {
  const [getResponseMutation, { isLoading: isFetching, data, error }] =
    useSearchByQueryMutation();
  const [
    getDocumentationMutation,
    { isLoading: isFetchingDoc, data: schema, error: errorDoc },
  ] = useGetDocumentationMutation();
  const [schemaVisible, setSchemaVisible] = useState(false);

  const { baseUrl, validHeaderJson, validVariableJson } = useSelector(
    (state: AppState) => state.request
  );

  const getResponse = async (value: RequestParams) => {
    await getResponseMutation(value);
  };

  const getDocumentation = async () => {
    if (!schema) {
      await getDocumentationMutation(baseUrl);
    }
    setSchemaVisible((prev) => !prev);
  };

  const {
    data: {
      mainPage: {
        loading,
        validHeaderMessage,
        validVariableMessage,
        errorCorsMessage,
        emptyDocMessage,
      },
    },
  } = useContext(LanguageContext);

  const errorJSON = useCallback(() => {
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
  }, [
    validHeaderJson,
    validVariableJson,
    validHeaderMessage,
    validVariableMessage,
  ]);

  let errorMessage: unknown | undefined | unknown[] = undefined;

  if (error && 'data' in error) {
    errorMessage = error.data;
  }

  if (error && !('data' in error)) {
    errorMessage = [errorCorsMessage, error];
  }

  if (errorDoc && 'data' in errorDoc) {
    errorMessage = errorDoc.data;
  }

  if (errorDoc && !('data' in errorDoc)) {
    errorMessage = [errorCorsMessage, errorDoc];
  }

  return (
    <>
      {isFetching && <Spinner />}
      {isFetchingDoc && <Spinner />}
      <Layout>
        <ChangeApi getDocumentationMutation={getDocumentationMutation} />
        <section className={styles.main__section}>
          <div>
            <button
              type="submit"
              data-testid="buttonDoc"
              onClick={getDocumentation}
              className={
                schemaVisible
                  ? `button button_square ${styles.button_doc_open}`
                  : `button button_square ${styles.button_doc_closed}`
              }
            ></button>
            {schemaVisible && schema ? (
              <Suspense fallback={<div>{loading}</div>}>
                <Documentation schema={schema} />
              </Suspense>
            ) : schemaVisible && !schema ? (
              <div>{emptyDocMessage}</div>
            ) : null}
          </div>

          <div className={styles.code_wrapper}>
            <Request getResponse={getResponse} />
            <Response
              data={errorJSON() || errorMessage || data?.data || data || {}}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export { Main };
