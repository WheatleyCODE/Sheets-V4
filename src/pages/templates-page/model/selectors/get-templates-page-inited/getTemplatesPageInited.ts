import { IStateSchema } from '@/app/providers/store-provider';

export const getTemplatesPageInited = (state: IStateSchema) => state.templatesPage?._inited || false;
