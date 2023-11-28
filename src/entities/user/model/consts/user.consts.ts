import type { IUserSchema } from '../types/user.interface';

export const initialUserState: IUserSchema = {
  _inited: false,
  isLoading: false,
  error: null,
};

export enum UserRoles {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}
