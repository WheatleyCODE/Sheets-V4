import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsIsLoading = (state: IStateSchema) => state?.templateDetails?.isLoading || false;
