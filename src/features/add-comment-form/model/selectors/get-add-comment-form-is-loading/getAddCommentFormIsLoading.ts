import { IStateSchema } from 'app/providers/store-provider';

export const getAddCommentFormIsLoading = (state: IStateSchema) => state?.addCommentForm?.isLoading || false;
