import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageInited, getTemplatesPageInited] = buildSelector(
  (state) => state.templatesPage?._inited || false,
);
