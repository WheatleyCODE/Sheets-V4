import { TemplateTags, TemplateView } from '@/entities/template';
import { ITemplatesPageSchema } from '../types/templatesPage.interface';
import { templatesPageActions, templatesPageReducer } from './templatesPageSlice';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { TemplateSortFields, TemplateSortOrders } from '../consts/templatesPage.consts';

describe('templatesPageSlice', () => {
  test('Test templatesPageReducer initState', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      _inited: false,
      view: TemplateView.LINES,
      limit: undefined,
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.initState)).toEqual({
      _inited: true,
      view: TemplateView.LINES,
      limit: 4,
    });
  });

  test('Test templatesPageReducer setView', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      view: TemplateView.LINES,
    };

    expect(
      templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setView(TemplateView.SQUARES)),
    ).toEqual({
      view: TemplateView.SQUARES,
    });
  });

  test('Test templatesPageReducer setPage', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      page: 10,
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setPage(1))).toEqual({
      page: 1,
    });
  });

  test('Test templatesPageReducer setLimit', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      limit: 4,
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setLimit(12))).toEqual({
      limit: 12,
    });
  });

  test('Test templatesPageReducer setHasMore', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      hasMore: false,
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setHasMore(true))).toEqual({
      hasMore: true,
    });
  });

  test('Test templatesPageReducer setSortOrder', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      sortOrder: TemplateSortOrders.DESC,
    };

    expect(
      templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setSortOrder(TemplateSortOrders.ASC)),
    ).toEqual({
      sortOrder: TemplateSortOrders.ASC,
    });
  });

  test('Test templatesPageReducer setSearch', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      search: '',
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setSearch('search'))).toEqual({
      search: 'search',
    });
  });

  test('Test templatesPageReducer setSort', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      sort: TemplateSortFields.CREATED_AT,
    };

    expect(
      templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setSort(TemplateSortFields.TITLE)),
    ).toEqual({
      sort: TemplateSortFields.TITLE,
    });
  });

  test('Test templatesPageReducer setSort', () => {
    const state: DeepPartial<ITemplatesPageSchema> = {
      tag: TemplateTags.AI,
    };

    expect(templatesPageReducer(state as ITemplatesPageSchema, templatesPageActions.setTags(TemplateTags.JS))).toEqual({
      tag: TemplateTags.JS,
    });
  });
});
