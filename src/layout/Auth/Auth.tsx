import styles from './Auth.module.scss';
import Logout from '@components/Logout/Logout';
import { UserContext } from '@context/AuthContext';
import { LanguageContext } from '@context/LanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const { user } = useContext(UserContext) || {};
  const {
    data: {
      auth: { login, signUp },
    },
  } = useContext(LanguageContext);

  return (
    <>
      {user ? (
        <>
          <Logout />
        </>
      ) : (
        <div className={styles.wrapper}>
          <Link to={RoutesPath.Login}>
            <button className="button">{login}</button>
          </Link>
          <Link to={RoutesPath.SignUp}>
            <button className="button">{signUp}</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Auth;
