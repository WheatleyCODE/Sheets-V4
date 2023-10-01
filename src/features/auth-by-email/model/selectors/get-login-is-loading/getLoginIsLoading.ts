import { IStateSchema } from 'app/providers/store-provider';

export const getLoginIsLoading = (state: IStateSchema) => state?.login?.isLoading || false;
