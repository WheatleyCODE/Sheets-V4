import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateDetailsError, getTemplateDetailsError] = buildSelector(
  getDefaultSelectorBy('templateDetails', 'error', null),
);
