import { IStateSchema } from '@/app/providers/store-provider';
import { TemplateSortOrders } from '../../consts/templatesPage.consts';

export const getTemplatesPageSortOrder = (state: IStateSchema) =>
  state.templatesPage?.sortOrder || TemplateSortOrders.ASC;
