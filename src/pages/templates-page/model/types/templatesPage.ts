import { EntityState } from '@reduxjs/toolkit';
import { ITemplate, TemplateView } from 'entities/template';

export interface ITemplatesPageSchema extends EntityState<ITemplate>, IReduxSchema {
  view: TemplateView;
  page: number;
  limit?: number;
  hasMore: boolean;
  _inited: boolean;
}
