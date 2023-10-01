import { IStateSchema } from 'app/providers/store-provider';

export const getLoginError = (state: IStateSchema) => state?.login?.error || null;
