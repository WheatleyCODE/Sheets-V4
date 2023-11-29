import { TemplateSortOrders } from '../../consts/templatesPage.consts';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageSortOrder, getTemplatesPageSortOrder] = buildSelector(
  (state) => state.templatesPage?.sortOrder || TemplateSortOrders.ASC,
);
