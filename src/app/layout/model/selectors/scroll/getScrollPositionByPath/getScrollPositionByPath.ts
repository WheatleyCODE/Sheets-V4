import { buildSelector } from '@/shared/lib/store';

export const [useScrollPositionByPath, getScrollPositionByPath] = buildSelector(
  (state, path: string) => state.scroll.scroll[path] || 0,
);
