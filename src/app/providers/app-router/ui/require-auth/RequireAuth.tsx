import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'features/user';
import { Navigate } from 'react-router-dom';
import { RoutesPath } from 'shared/config/route-config/routeConfig';

export const RequireAuth: FC<FCProps> = ({ children }) => {
  const isAuth = !!useSelector(getUser);

  if (!isAuth) return <Navigate to={RoutesPath.home} replace />;

  return children;
};
