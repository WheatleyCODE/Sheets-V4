import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsRecommendsError = (state: IStateSchema) =>
  state.templateDetailsRecommends?.error || null;
