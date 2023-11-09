import { createSelector } from '@reduxjs/toolkit';
import { getUserRoles } from '../get-user-roles/getUserRoles';
import { UserRoles } from '../../consts/user.consts';

export const isUserRoleAdmin = createSelector(getUserRoles, (roles) => Boolean(roles.includes(UserRoles.ADMIN)));
export const isUserRoleUser = createSelector(getUserRoles, (roles) => Boolean(roles.includes(UserRoles.USER)));
export const isUserRoleDeveloper = createSelector(getUserRoles, (roles) =>
  Boolean(roles.includes(UserRoles.DEVELOPER)),
);
