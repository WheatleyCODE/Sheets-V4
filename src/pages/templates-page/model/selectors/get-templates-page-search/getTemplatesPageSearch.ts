import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageSearch, getTemplatesPageSearch] = buildSelector(
  (state) => state.templatesPage?.search || '',
);
