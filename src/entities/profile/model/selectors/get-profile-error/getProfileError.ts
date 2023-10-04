import { IStateSchema } from 'app/providers/store-provider';

export const getProfileError = (state: IStateSchema) => state?.profile?.error || null;
