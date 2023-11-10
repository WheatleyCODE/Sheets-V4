import { DeepPartial } from '@/shared/lib/ts-utils';
import { getUser } from './getUser';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getUser', () => {
  test('Return user state user prop', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { email: 'ya@mail.ru', id: '1' } },
    };

    expect(getUser(state as IStateSchema)).toEqual({ email: 'ya@mail.ru', id: '1' });
  });

  test('Return user state user prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getUser(state as IStateSchema)).toBe(undefined);
  });
});
