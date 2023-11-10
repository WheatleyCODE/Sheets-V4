import { DeepPartial } from '@/shared/lib/ts-utils';
import { getLoginPassword } from './getLoginPassword';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getLoginPassword', () => {
  test('Return login state password prop', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { password: '12345678' },
    };

    expect(getLoginPassword(state as IStateSchema)).toBe('12345678');
  });

  test('Return login state password prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginPassword(state as IStateSchema)).toBe('');
  });
});
