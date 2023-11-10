import { IUser, UserRoles } from '@/features/user';

export const isRoleAdmin = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.ADMIN));
export const isRoleDeveloper = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.DEVELOPER));
export const isRoleUser = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.USER));
