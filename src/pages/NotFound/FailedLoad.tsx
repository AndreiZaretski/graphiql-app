import { LanguageContext } from '@context/LanguageContext';
import { Layout } from '@layout/Layout';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const FailedLoad = () => {
  const location = useLocation();
  const {
    data: {
      notFound: { failedLoad },
    },
  } = useContext(LanguageContext);
  return (
    <Layout>
      <h2 data-testid="failedLoad">
        {failedLoad} {location.pathname}
      </h2>
    </Layout>
  );
};

export { FailedLoad };
