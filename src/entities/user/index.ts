export { userReducer, userActions } from './model/slice/userSlice';
export { UserRoles } from './model/consts/user.consts';
export type { IUser, IUserSchema } from './model/types/user.interface';
export {
  useUserRoleIsAdmin,
  useUserRoleIsDeveloper,
  useUserRoleIsUser,
  getUserRoleIsAdmin,
  getUserRoleIsDeveloper,
  getUserRoleIsUser,
} from './model/selectors/user-role-selector/userRoleSelector';
export {
  useGetClientSettings,
  useGetClientSettingsByKey,
} from './model/selectors/get-user-client-settings/getUserClientSettings';

export { getUserError, useUserError } from './model/selectors/get-user-error/getUserError';
export { getUserIsLoading, useUserIsLoading } from './model/selectors/get-user-is-loading/getUserIsLoading';
export { getUserInited, useUserInited } from './model/selectors/get-user-inited/getUserInited';
export { getUser, useUser } from './model/selectors/get-user/getUser';
export { getUserRoles, useUserRoles } from './model/selectors/get-user-roles/getUserRoles';

export { fetchUser } from './model/services/fetchUser';
