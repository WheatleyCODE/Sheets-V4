import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateRecommendsError, getTemplateRecommendsError] = buildSelector(
  getDefaultSelectorBy('templateRecommends', 'error', null),
);
