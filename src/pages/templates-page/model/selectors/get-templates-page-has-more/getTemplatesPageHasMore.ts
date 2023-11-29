import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageHasMore, getTemplatesPageHasMore] = buildSelector(
  (state) => state.templatesPage?.hasMore || false,
);
