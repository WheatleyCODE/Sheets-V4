import { EntityState } from '@reduxjs/toolkit';
import { ITemplate, TemplateTags, TemplateView } from 'entities/template';
import { TemplateSortFields, TemplateSortOrders } from '../consts/templatesPage.consts';

export interface ITemplatesPageSchema extends EntityState<ITemplate>, IReduxSchema {
  view: TemplateView;
  page: number;
  limit: number;
  hasMore: boolean;
  _inited: boolean;

  // * Sort
  sortOrder: TemplateSortOrders;
  sort: TemplateSortFields;
  search: string;
  tag: TemplateTags;
}
