import { IStateSchema } from 'app/providers/store-provider';

export const getUser = (state: IStateSchema) => state?.user?.user;
