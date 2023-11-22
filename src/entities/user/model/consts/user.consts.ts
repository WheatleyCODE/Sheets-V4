import type { IUserSchema } from '../types/user.interface';

export const initialUserState: IUserSchema = {
  _inited: false,
};

export enum UserRoles {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}
