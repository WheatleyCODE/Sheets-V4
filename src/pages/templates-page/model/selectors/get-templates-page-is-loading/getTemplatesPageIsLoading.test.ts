import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageIsLoading } from './getTemplatesPageIsLoading';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplatesPageIsLoading', () => {
  test('Return template page state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { isLoading: true },
    };

    expect(getTemplatesPageIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return template page state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageIsLoading(state as IStateSchema)).toBe(false);
  });
});
