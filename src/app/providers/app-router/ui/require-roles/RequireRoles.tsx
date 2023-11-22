import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserRoles, getUserRoles } from '@/entities/user';
import { Navigate } from 'react-router-dom';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';

export const RequireRoles: FC<FCProps & { roles: UserRoles[] }> = ({ children, roles }) => {
  const userRoles = useSelector(getUserRoles);
  const isAccess = useMemo(() => roles.some((role) => (userRoles.includes(role) ? true : false)), [roles, userRoles]);

  if (!isAccess) return <Navigate to={RoutesPath.forbidden} replace />;

  return children;
};
