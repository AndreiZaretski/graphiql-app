import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@context/AuthContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { Props } from '@type/interfaces/props.interface';

const ProtectedRoutes = ({ children }: Props) => {
  const { user } = useContext(UserContext) || {};

  if (!user) {
    return <Navigate to={RoutesPath.Login} />;
  }

  return children;
};

export default ProtectedRoutes;
