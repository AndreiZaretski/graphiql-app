import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
