export enum UserRoles {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}
export interface IUser {
  id: string;
  email: string;
  roles?: UserRoles[];
  username?: string;
  avatar?: string;
}

export interface IUserSchema {
  user?: IUser;
  _inited: boolean;
}
