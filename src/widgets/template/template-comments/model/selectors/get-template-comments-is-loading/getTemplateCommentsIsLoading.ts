import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateCommentsIsLoading, getTemplateCommentsIsLoading] = buildSelector(
  getDefaultSelectorBy('templateComments', 'isLoading', false),
);
