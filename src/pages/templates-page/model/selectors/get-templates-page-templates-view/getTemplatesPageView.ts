import { TemplateView } from '@/entities/template';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageView, getTemplatesPageView] = buildSelector(
  (state) => state.templatesPage?.view || TemplateView.SQUARES,
);

export const [useTemplateById, getTemplateById] = buildSelector(
  (state, id: string) => state.templatesPage?.entities[id],
);
