import { SQUARES_TEMPLATE_COUNT } from '@/entities/template';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageLimit, getTemplatesPageLimit] = buildSelector(
  (state) => state.templatesPage?.limit || SQUARES_TEMPLATE_COUNT,
);
