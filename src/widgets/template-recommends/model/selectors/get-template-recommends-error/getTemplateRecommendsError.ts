import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateRecommendsError = (state: IStateSchema) => state.templateRecommends?.error || null;
