import { IStateSchema } from '@/app/providers/store-provider';

export const getProfileLastname = (state: IStateSchema) => state?.profile?.profile?.lastname || '';
