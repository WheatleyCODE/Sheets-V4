import { DeepPartial } from '@/shared/lib/ts-utils';
import { getLoginState } from './getLoginState';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getLoginState', () => {
  test('Return login state', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { password: '12345678', email: 'ya@mail.ru', error: null, isLoading: false },
    };

    expect(getLoginState(state as IStateSchema)).toEqual({
      password: '12345678',
      email: 'ya@mail.ru',
      error: null,
      isLoading: false,
    });
  });

  test('Return login state, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginState(state as IStateSchema)).toEqual({
      password: '',
      email: '',
      error: null,
      isLoading: false,
    });
  });
});
