import { Navigate } from 'react-router-dom';
import { LocalStorageServise } from '../../services/localStorageService';
import { LocalStorageKeys } from '../enums/localStarage.enum';
import { RoutesPath } from '../enums/routes.enum';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
  const auth = LocalStorageServise.get(LocalStorageKeys.Auth);
  return auth ? children : <Navigate to={RoutesPath.Login} />;
};

export default ProtectedRoutes;
