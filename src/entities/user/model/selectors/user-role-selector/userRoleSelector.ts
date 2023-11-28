import { getUserRoles } from '../get-user-roles/getUserRoles';
import { UserRoles } from '../../consts/user.consts';
import { buildSelector } from '@/shared/lib/store';

export const [useUserRoleIsAdmin, getUserRoleIsAdmin] = buildSelector(getUserRoles, (roles) =>
  Boolean(roles.includes(UserRoles.ADMIN)),
);

export const [useUserRoleIsUser, getUserRoleIsUser] = buildSelector(getUserRoles, (roles) =>
  Boolean(roles.includes(UserRoles.USER)),
);

export const [useUserRoleIsDeveloper, getUserRoleIsDeveloper] = buildSelector(getUserRoles, (roles) =>
  Boolean(roles.includes(UserRoles.DEVELOPER)),
);
