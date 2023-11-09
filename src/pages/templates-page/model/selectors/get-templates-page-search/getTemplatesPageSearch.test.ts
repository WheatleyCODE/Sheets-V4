import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageSearch } from './getTemplatesPageSearch';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplatesPageSearch', () => {
  test('Return template page state search prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { search: 'search' },
    };

    expect(getTemplatesPageSearch(state as IStateSchema)).toBe('search');
  });

  test('Return template page state search prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageSearch(state as IStateSchema)).toBe('');
  });
});
