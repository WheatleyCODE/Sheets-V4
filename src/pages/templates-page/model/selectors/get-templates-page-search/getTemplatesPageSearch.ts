import { IStateSchema } from 'app/providers/store-provider';

export const getTemplatesPageSearch = (state: IStateSchema) => state.templatesPage?.search || '';
