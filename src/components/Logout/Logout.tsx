import styles from '../../layout/Header/Header.module.scss';

import { UserContext } from '@context/AuthContext';
import { LanguageContext } from '@context/LanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(UserContext) || {};
  const {
    data: {
      auth: { logOut },
    },
  } = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <button onClick={handleLogout} className="button">
    //   {logOut}
    // </button>

    <li className={styles.navigation__item}>
      <Link to={RoutesPath.Main} className="link" onClick={handleLogout}>
        {logOut}
      </Link>
    </li>
  );
};

export default Logout;
