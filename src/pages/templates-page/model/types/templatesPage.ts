import { EntityState } from '@reduxjs/toolkit';
import { ITemplate, TemplateView } from 'entities/template';

export enum TemplateSortFields {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
}

export enum TemplateSortOrders {
  ASC = 'asc',
  DESC = 'desc',
}
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
}
