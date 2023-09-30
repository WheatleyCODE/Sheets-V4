import { IModalsSchema } from 'app/modal-controller';
import { IUserSchema } from 'entities/user';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;
}
