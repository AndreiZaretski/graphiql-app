import styles from './Layout.module.scss';
import { Props } from '@type/interfaces/props.interface';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
