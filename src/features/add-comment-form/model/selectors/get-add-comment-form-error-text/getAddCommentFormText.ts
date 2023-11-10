import { IStateSchema } from '@/app/providers/store-provider';

export const getAddCommentFormText = (state: IStateSchema) => state?.addCommentForm?.text || '';
