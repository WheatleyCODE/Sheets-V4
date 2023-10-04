import { DeepPartial } from 'shared/lib/ts-utils';
import { getProfileIsLoading } from './getProfileIsLoading';
import { IStateSchema } from 'app/providers/store-provider';

describe('getProfileIsLoading', () => {
  test('Return profile state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { isLoading: true },
    };

    expect(getProfileIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return profile state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileIsLoading(state as IStateSchema)).toBe(false);
  });
});
