import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useAddCommentFormError, getAddCommentFormError] = buildSelector(
  getDefaultSelectorBy('addCommentForm', 'error', null),
);
