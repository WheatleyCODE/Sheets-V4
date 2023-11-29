import { INIT_PAGE_COUNT } from '../../consts/templatesPage.consts';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPagePage, getTemplatesPagePage] = buildSelector(
  (state) => state.templatesPage?.page || INIT_PAGE_COUNT,
);
