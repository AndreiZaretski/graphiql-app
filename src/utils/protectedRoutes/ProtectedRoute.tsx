import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@context/AuthContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { Props } from '@type/interfaces/props.interface';

const ProtectedRoutes = ({ children }: Props) => {
  const { user } = useContext(UserContext) || {};
  const location = useLocation();
  const currentPath = location.pathname;

  const checkMainPage = !user && currentPath === RoutesPath.Main;
  const checkMainLogin = user && currentPath === RoutesPath.Login;
  const checkMainSignUp = user && currentPath === RoutesPath.SignUp;

  if (checkMainPage) {
    return <Navigate to={RoutesPath.Login} />;
  }

  if (checkMainLogin || checkMainSignUp) {
    return <Navigate to={RoutesPath.Main} />;
  }

  return children;
};

export { ProtectedRoutes };
