import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplatesPageError, getTemplatesPageError] = buildSelector(
  getDefaultSelectorBy('templatesPage', 'error', null),
);
