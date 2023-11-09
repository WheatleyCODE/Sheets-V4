import { UserRoles } from '../consts/user.consts';

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
