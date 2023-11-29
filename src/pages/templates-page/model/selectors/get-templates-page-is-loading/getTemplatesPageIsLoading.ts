import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplatesPageIsLoading, getTemplatesPageIsLoading] = buildSelector(
  getDefaultSelectorBy('templatesPage', 'isLoading', false),
);
