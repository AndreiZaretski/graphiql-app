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
      auth: { main, login, signUp },
    },
  } = useContext(LanguageContext);

  return (
    <>
      {user ? (
        <>
          <Link to={RoutesPath.Main}>{main}</Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to={RoutesPath.Login}>{login}</Link>
          <Link to={RoutesPath.SignUp}>{signUp}</Link>
        </>
      )}
    </>
  );
};

export default Auth;
