import styles from '../Header/Header.module.scss';

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
        <>
          <li className={styles.navigation__item}>
            <Link to={RoutesPath.Login} className="link">
              {login}
            </Link>
          </li>
          <li className={styles.navigation__item}>
            <Link to={RoutesPath.SignUp} className="link">
              {signUp}
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default Auth;
