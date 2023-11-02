export interface IUser {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export interface IUserSchema {
  user?: IUser;
  _inited: boolean;
}