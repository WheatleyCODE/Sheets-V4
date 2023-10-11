import { IStateSchema } from 'app/providers/store-provider';

export const getTemplatesPageLimit = (state: IStateSchema) => state.templatesPage?.limit || 9;
