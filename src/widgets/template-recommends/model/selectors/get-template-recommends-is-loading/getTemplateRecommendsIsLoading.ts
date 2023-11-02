import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateRecommendsIsLoading = (state: IStateSchema) => state.templateRecommends?.isLoading || false;
