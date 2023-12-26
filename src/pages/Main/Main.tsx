import { lazy, Suspense } from 'react';
import Layout from '@layout/Layout';
import Request from './Request/Request';
import Response from './Response/Response';
const Documentation = lazy(() => import('./Documentation/Documentation'));
import {
  useSearchByQueryMutation,
  useGetDocumentationMutation,
} from '../../store/api/graphiqlApi';

const Main = () => {
  const [getResponseMutation, { data }] = useSearchByQueryMutation();
  const [getDocumentationMutation, { data: schema }] =
    useGetDocumentationMutation();

  const getResponse = async (value: string) => {
    await getResponseMutation(value);
  };

  return (
    <div className="main-wrapper">
      <Layout>
        <main className="main">
          <Request getResponse={getResponse} />
          <Response data={data?.data || {}} />
          <button
            className="main__btn_docs"
            type="submit"
            onClick={getDocumentationMutation}
          >
            Doc
          </button>
          {schema && (
            <Suspense fallback={<div>Loading...</div>}>
              <Documentation schema={schema} />
            </Suspense>
          )}
        </main>
      </Layout>
    </div>
  );
};

export default Main;
