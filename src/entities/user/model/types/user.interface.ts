import { IClientSettings, IFeatureFlags } from '@/shared/types';
import { UserRoles } from '../consts/user.consts';

export interface IUser {
  id: string;
  email: string;
  roles?: UserRoles[];
  username?: string;
  features?: IFeatureFlags;
  clientSettings?: IClientSettings;
  avatar?: string;
}

export interface IUserSchema extends IReduxSchema {
  user?: IUser;
  _inited: boolean;
}
