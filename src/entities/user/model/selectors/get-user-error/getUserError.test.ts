import { DeepPartial } from '@/shared/lib/ts-utils';
import { getUserError } from './getUserError';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getUserError', () => {
  test('Return user state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { error: 'error' },
    };

    expect(getUserError(state as IStateSchema)).toBe('error');
  });

  test('Return user state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getUserError(state as IStateSchema)).toBe(null);
  });
});
