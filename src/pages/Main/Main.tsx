import { lazy, Suspense, useState } from 'react';
import Layout from '@layout/Layout';
import Request from './Request/Request';
import Response from './Response/Response';
const Documentation = lazy(() => import('./Documentation/Documentation'));
import './Main.module.scss';

import { RequestParams } from '@type/interfaces/props.interface';
import { AppState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetDocumentationMutation,
  useSearchByQueryMutation,
} from '@store/api/graphiqlApi';
import { setBaseUrl } from '@store/features/requestDataSlice';
import { isValidUrl } from '@utils/validationUrl';

const Main = () => {
  const [getResponseMutation, { data }] = useSearchByQueryMutation();
  const [getDocumentationMutation, { data: schema }] =
    useGetDocumentationMutation();

  const { baseUrl } = useSelector((state: AppState) => state.request);

  const [inputBaseUrl, setInputBaseUrl] = useState(baseUrl);

  const dispatch = useDispatch();

  const handleChangeBaseUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBaseUrl(e.target.value);
  };

  const handleClickBaseUrl = () => {
    if (isValidUrl(inputBaseUrl)) {
      dispatch(setBaseUrl(inputBaseUrl));
    } else {
      //Replace this method
      alert('Please enter a valid URL');
    }
  };

  const getResponse = async (value: RequestParams) => {
    await getResponseMutation(value);
  };

  const getDocumentation = async () => {
    await getDocumentationMutation(baseUrl);
  };

  return (
    <Layout>
      <main>
        <input
          type="text"
          value={inputBaseUrl}
          onChange={handleChangeBaseUrl}
          placeholder="Enter baseUrl"
        />
        <button type="button" onClick={handleClickBaseUrl}>
          {'Change Api'}
        </button>
        <Request getResponse={getResponse} />
        <Response data={data?.data || {}} />
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
