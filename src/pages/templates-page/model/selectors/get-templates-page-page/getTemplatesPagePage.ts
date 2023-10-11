import { IStateSchema } from 'app/providers/store-provider';

export const getTemplatesPagePage = (state: IStateSchema) => state.templatesPage?.page || 1;
