import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageSortOrder } from './getTemplatesPageSortOrder';
import { IStateSchema } from '@/app/providers/store-provider';
import { TemplateSortOrders } from '../../consts/templatesPage.consts';

describe('getTemplatesPageSortOrder', () => {
  test('Return template page state sortOrder prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { sortOrder: TemplateSortOrders.DESC },
    };

    expect(getTemplatesPageSortOrder(state as IStateSchema)).toBe(TemplateSortOrders.DESC);
  });

  test('Return template page state sortOrder prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageSortOrder(state as IStateSchema)).toBe(TemplateSortOrders.ASC);
  });
});
