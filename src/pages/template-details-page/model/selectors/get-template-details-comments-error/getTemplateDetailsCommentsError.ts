import { IStateSchema } from 'app/providers/store-provider';

export const getTemplateDetailsCommentsError = (state: IStateSchema) => state.templateDetailsComments?.error || null;
