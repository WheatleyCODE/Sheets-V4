import { IStateSchema } from 'app/providers/store-provider';

export const getLoginPassword = (state: IStateSchema) => state?.login?.password || '';
