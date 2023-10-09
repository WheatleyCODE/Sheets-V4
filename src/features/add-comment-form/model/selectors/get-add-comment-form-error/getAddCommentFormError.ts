import { IStateSchema } from 'app/providers/store-provider';

export const getAddCommentFormError = (state: IStateSchema) => state?.addCommentForm?.error || null;
