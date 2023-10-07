import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsError = (state: IStateSchema) => state?.templateDetails?.error || null;
