import { IStateSchema } from 'app/providers/store-provider';

export const getTemplatesPageIsLoading = (state: IStateSchema) => state.templatesPage?.isLoading || false;
