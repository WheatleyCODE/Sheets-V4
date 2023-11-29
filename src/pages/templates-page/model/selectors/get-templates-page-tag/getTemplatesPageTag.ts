import { TemplateTags } from '@/entities/template';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageTag, getTemplatesPageTag] = buildSelector(
  (state) => state.templatesPage?.tag || TemplateTags.ALL,
);
