import { IStateSchema } from 'app/providers/store-provider';

export const getProfileFirstname = (state: IStateSchema) => state?.profile?.profile?.firstname || '';
