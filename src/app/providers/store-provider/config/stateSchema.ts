import { IModalsSchema } from 'widgets/layout';
import { IUserSchema } from 'entities/user';
import { ILoginSchema } from 'features/auth-by-email';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;
  login: ILoginSchema;
}
