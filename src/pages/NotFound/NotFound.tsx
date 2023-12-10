import { LanguageContext } from '@context/LanguageContext';
import Layout from '@layout/Layout';
import { useContext } from 'react';

const NotFound = () => {
  const {
    data: {
      notFound: { text },
    },
  } = useContext(LanguageContext);
  return (
    <Layout>
      <h2>{text}</h2>
    </Layout>
  );
};

export default NotFound;
