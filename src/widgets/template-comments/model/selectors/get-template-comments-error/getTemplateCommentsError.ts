import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateCommentsError, getTemplateCommentsError] = buildSelector(
  getDefaultSelectorBy('templateComments', 'error', null),
);
