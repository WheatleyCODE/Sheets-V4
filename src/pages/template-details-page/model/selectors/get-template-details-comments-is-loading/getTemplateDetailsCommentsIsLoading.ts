import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsCommentsIsLoading = (state: IStateSchema) =>
  state.templateDetailsComments?.isLoading || false;
