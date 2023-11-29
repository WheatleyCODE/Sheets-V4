import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageTemplatesSelectAll } from './getTemplatesPageTemplates';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplatesPageTemplatesSelectAll', () => {
  test('Return user state templatesPage prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { ids: [] },
    };

    expect(getTemplatesPageTemplatesSelectAll(state as IStateSchema)).toStrictEqual([]);
  });

  test('Return user state templatesPage prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageTemplatesSelectAll(state as IStateSchema)).toStrictEqual([]);
  });
});
