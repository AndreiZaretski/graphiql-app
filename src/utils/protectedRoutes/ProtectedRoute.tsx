import { Navigate } from 'react-router-dom';
import { LocalStorageServise } from '../../services/localStorageService';
import { LocalStorageKeys } from '../../types/enums/localStarage.enum';
import { RoutesPath } from '../../types/enums/routes.enum';
import { Props } from '../../types/interfaces/props.interface';

const ProtectedRoutes = ({ children }: Props) => {
  //Replace with on logic with firebase
  const auth = LocalStorageServise.get(LocalStorageKeys.Auth);

  return auth ? children : <Navigate to={RoutesPath.Login} />;
};

export default ProtectedRoutes;
