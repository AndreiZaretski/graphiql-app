import Layout from '@layout/Layout';
import Request from './Request/Request';
import Response from './Response/Response';
import './Main.module.scss';
import { useSearchByQueryMutation } from '../../store/api/graphiqlApi';

const Main = () => {
  const [getResponseMutation, { data }] = useSearchByQueryMutation();

  const getResponse = async (value: string) => {
    await getResponseMutation(value);
  };

  return (
    <Layout>
      <main>
        <Request getResponse={getResponse} />
        <Response data={JSON.stringify(data)} />
      </main>
    </Layout>
  );
};

export default Main;
