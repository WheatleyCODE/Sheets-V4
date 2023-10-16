import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsRecommendsIsLoading = (state: IStateSchema) =>
  state.templateDetailsRecommends?.isLoading || false;
