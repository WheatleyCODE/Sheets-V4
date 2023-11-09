import type { IAddCommentFormSchema } from '../types/addCommentForm.interface';

export const initialAddCommentFormState: IAddCommentFormSchema = {
  isLoading: false,
  error: null,
  text: '',
};
