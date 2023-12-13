import { Navigate } from 'react-router-dom';
// import { LocalStorageServise } from '../../services/localStorageService';
// import { LocalStorageKeys } from '../../types/enums/localStarage.enum';
import { RoutesPath } from '../../types/enums/routes.enum';
import { Props } from '../../types/interfaces/props.interface';
import { useContext } from 'react';
import { UserContext } from '@context/AuthContext';

const ProtectedRoutes = ({ children }: Props) => {
  const { user } = useContext(UserContext) || {};

  if (!user) {
    return <Navigate to={RoutesPath.Login} />;
  }

  return children;
};

export default ProtectedRoutes;
