import { FC, useMemo } from 'react';
import { UserRoles, useUserRoles } from '@/entities/user';
import { Navigate } from 'react-router-dom';
import { getRouteForbidden } from '@/shared/config/route-config/routeConfig';

export const RequireRoles: FC<FCProps & { roles: UserRoles[] }> = ({ children, roles }) => {
  const userRoles = useUserRoles();
  const isAccess = useMemo(() => roles.some((role) => (userRoles.includes(role) ? true : false)), [roles, userRoles]);

  if (!isAccess) return <Navigate to={getRouteForbidden()} replace />;

  return children;
};
