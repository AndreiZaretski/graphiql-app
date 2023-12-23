import { lazy, Suspense } from 'react';
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

const Main = () => {
  const [getResponseMutation, { data, error }] = useSearchByQueryMutation();
  const [getDocumentationMutation, { data: schema }] =
    useGetDocumentationMutation();

  const { baseUrl } = useSelector((state: AppState) => state.request);

  const getResponse = async (value: RequestParams) => {
    await getResponseMutation(value);
  };

  const getDocumentation = async () => {
    await getDocumentationMutation(baseUrl);
  };

  let errorMessage = undefined;

  if (error && 'data' in error) {
    errorMessage = error.data;
  }
  return (
    <Layout>
      <main>
        <ChangeApi />
        <Request getResponse={getResponse} />
        <Response data={data?.data || errorMessage || {}} />

        <button type="submit" onClick={getDocumentation}>
          Doc
        </button>
        {schema && (
          <Suspense fallback={<div>Loading...</div>}>
            <Documentation schema={schema} />
          </Suspense>
        )}
      </main>
    </Layout>
  );
};

export default Main;
