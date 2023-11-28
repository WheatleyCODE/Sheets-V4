import { DeepPartial } from '@/shared/lib/ts-utils';
import { getUserIsLoading } from './getUserIsLoading';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getUserIsLoading', () => {
  test('Return user state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { isLoading: true },
    };

    expect(getUserIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return user state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getUserIsLoading(state as IStateSchema)).toBe(false);
  });
});
