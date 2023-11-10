import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageHasMore } from './getTemplatesPageHasMore';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplatesPageHasMore', () => {
  test('Return template page state hasMore prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { hasMore: true },
    };

    expect(getTemplatesPageHasMore(state as IStateSchema)).toBe(true);
  });

  test('Return template page state hasMore prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageHasMore(state as IStateSchema)).toBe(false);
  });
});
