import { Props } from '@type/interfaces/props.interface';
import Footer from './Footer/Footer';
import Header from './Header/Header';

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
