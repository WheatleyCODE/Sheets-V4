import { IStateSchema } from '@/app/providers/store-provider';

// ! FIX NUMBERS
export const getTemplatesPagePage = (state: IStateSchema) => state.templatesPage?.page || 1;
