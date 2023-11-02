import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateCommentsError = (state: IStateSchema) => state.templateComments?.error || null;
