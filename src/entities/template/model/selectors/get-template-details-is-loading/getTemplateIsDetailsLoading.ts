import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateDetailsIsLoading, getTemplateDetailsIsLoading] = buildSelector(
  getDefaultSelectorBy('templateDetails', 'isLoading', false),
);
