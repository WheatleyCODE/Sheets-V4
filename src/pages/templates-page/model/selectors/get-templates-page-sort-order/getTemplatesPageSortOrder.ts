import { IStateSchema } from 'app/providers/store-provider';
import { TemplateSortOrders } from '../../types/templatesPage';

export const getTemplatesPageSortOrder = (state: IStateSchema) =>
  state.templatesPage?.sortOrder || TemplateSortOrders.ASC;
