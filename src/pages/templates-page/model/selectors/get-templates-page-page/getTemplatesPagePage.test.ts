import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPagePage } from './getTemplatesPagePage';
import { IStateSchema } from 'app/providers/store-provider';

// ! FIX NUMBERS

describe('getTemplatesPageIsLoading', () => {
  test('Return template page state page prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { page: 2 },
    };

    expect(getTemplatesPagePage(state as IStateSchema)).toBe(2);
  });

  test('Return template page state page prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPagePage(state as IStateSchema)).toBe(1);
  });
});
