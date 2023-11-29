import { getUserRoles } from '../get-user-roles/getUserRoles';
import { UserRoles } from '../../consts/user.consts';
import { buildSelector } from '@/shared/lib/store';
import { createSelector } from '@reduxjs/toolkit';

export const [useUserRoleIsAdmin, getUserRoleIsAdmin] = buildSelector(
  createSelector(getUserRoles, (roles) => Boolean(roles.includes(UserRoles.ADMIN))),
);

export const [useUserRoleIsUser, getUserRoleIsUser] = buildSelector(
  createSelector(getUserRoles, (roles) => Boolean(roles.includes(UserRoles.USER))),
);

export const [useUserRoleIsDeveloper, getUserRoleIsDeveloper] = buildSelector(
  createSelector(getUserRoles, (roles) => Boolean(roles.includes(UserRoles.DEVELOPER))),
);
