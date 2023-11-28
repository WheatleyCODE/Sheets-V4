import { FC } from 'react';
import { useUser } from '@/entities/user';
import { Navigate } from 'react-router-dom';
import { getRouteHome } from '@/shared/config/route-config/routeConfig';

export const RequireAuth: FC<FCProps> = ({ children }) => {
  const isAuth = !!useUser();

  if (!isAuth) return <Navigate to={getRouteHome()} replace />;

  return children;
};
