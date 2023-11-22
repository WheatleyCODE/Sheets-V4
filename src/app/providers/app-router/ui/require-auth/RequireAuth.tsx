import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/entities/user';
import { Navigate } from 'react-router-dom';
import { getRouteHome } from '@/shared/config/route-config/routeConfig';

export const RequireAuth: FC<FCProps> = ({ children }) => {
  const isAuth = !!useSelector(getUser);

  if (!isAuth) return <Navigate to={getRouteHome()} replace />;

  return children;
};
