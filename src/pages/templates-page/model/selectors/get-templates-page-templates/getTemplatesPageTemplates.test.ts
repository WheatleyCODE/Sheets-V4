import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageTemplates } from './getTemplatesPageTemplates';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplatesPageTemplates', () => {
  test('Return user state templatesPage prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { ids: [] },
    };

    expect(getTemplatesPageTemplates.selectAll(state as IStateSchema)).toStrictEqual([]);
  });

  test('Return user state templatesPage prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageTemplates.selectAll(state as IStateSchema)).toStrictEqual([]);
  });
});
