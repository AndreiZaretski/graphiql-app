import Logout from '@components/Logout/Logout';
import { UserContext } from '@context/AuthContext';
import { LanguageContext } from '@context/LanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { useContext } from 'react';
import { NavigationLink } from '@components/NavigationLink/NavigationLink';

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
        <Logout />
      ) : (
        <>
          <NavigationLink to={RoutesPath.Login} text={login} />
          <NavigationLink to={RoutesPath.SignUp} text={signUp} />
        </>
      )}
    </>
  );
};

export default Auth;
