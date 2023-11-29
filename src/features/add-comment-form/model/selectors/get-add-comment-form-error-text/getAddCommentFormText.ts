import { buildSelector } from '@/shared/lib/store';

export const [useAddCommentFormText, getAddCommentFormText] = buildSelector(
  (state) => state?.addCommentForm?.text || '',
);
