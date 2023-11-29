import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useAddCommentFormIsLoading, getAddCommentFormIsLoading] = buildSelector(
  getDefaultSelectorBy('addCommentForm', 'isLoading', false),
);
