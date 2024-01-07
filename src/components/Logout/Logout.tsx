import { UserContext } from '@context/AuthContext';
import { LanguageContext } from '@context/LanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationLink } from '@layout/Header/NavigationLink';

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
      return;
    }
  };

  return (
    <NavigationLink to={RoutesPath.Main} text={logOut} onClick={handleLogout} />
  );
};

export { Logout };
