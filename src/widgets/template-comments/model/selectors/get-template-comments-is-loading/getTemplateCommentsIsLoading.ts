import { IStateSchema } from '@/app/providers/store-provider';

export const getTemplateCommentsIsLoading = (state: IStateSchema) => state.templateComments?.isLoading || false;
