import { IStateSchema } from 'app/providers/store-provider';

export const getLoginEmail = (state: IStateSchema) => state?.login?.email || '';
