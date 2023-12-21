import Layout from '@layout/Layout';
import Request from './Request/Request';
import Response from './Response/Response';
import Documentation from './Documentation/Documentation';
import './Main.module.scss';
import {
  useSearchByQueryMutation,
  useGetDocumentationMutation,
} from '../../store/api/graphiqlApi';

const Main = () => {
  const [getResponseMutation, { data }] = useSearchByQueryMutation();
  const [getDocumentationMutation, { data: documentation }] =
    useGetDocumentationMutation();

  const getResponse = async (value: string) => {
    await getResponseMutation(value);
  };

  return (
    <Layout>
      <main>
        <Request getResponse={getResponse} />
        <Response data={data?.data || {}} />
        <button type="submit" onClick={getDocumentationMutation}>
          Doc
        </button>
        {documentation && <Documentation documentation={documentation} />}
      </main>
    </Layout>
  );
};

export default Main;
