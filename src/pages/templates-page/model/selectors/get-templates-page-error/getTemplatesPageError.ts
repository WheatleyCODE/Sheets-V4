import { IStateSchema } from '@/app/providers/store-provider';

export const getTemplatesPageError = (state: IStateSchema) => state.templatesPage?.error || null;
