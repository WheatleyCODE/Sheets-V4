import { IStateSchema } from 'app/providers/store-provider';

export const getProfileIsLoading = (state: IStateSchema) => state?.profile?.isLoading || false;
