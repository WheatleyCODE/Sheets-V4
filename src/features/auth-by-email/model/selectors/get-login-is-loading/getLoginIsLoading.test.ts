import { DeepPartial } from 'shared/lib/ts-utils';
import { getLoginIsLoading } from './getLoginIsLoading';
import { IStateSchema } from 'app/providers/store-provider';

describe('getLoginIsLoading', () => {
  test('Return login state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { isLoading: true },
    };

    expect(getLoginIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return login state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginIsLoading(state as IStateSchema)).toBe(false);
  });
});
