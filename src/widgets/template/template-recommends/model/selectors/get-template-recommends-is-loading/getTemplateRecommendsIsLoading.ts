import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useTemplateRecommendsIsLoading, getTemplateRecommendsIsLoading] = buildSelector(
  getDefaultSelectorBy('templateRecommends', 'isLoading', false),
);
