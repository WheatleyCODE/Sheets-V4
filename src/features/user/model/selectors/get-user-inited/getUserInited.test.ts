import { DeepPartial } from 'shared/lib/ts-utils';
import { getUserInited } from './getUserInited';
import { IStateSchema } from 'app/providers/store-provider';

describe('getUserInited', () => {
  test('Return user state user prop', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { email: 'ya@mail.ru', id: '1' }, _inited: false },
    };

    expect(getUserInited(state as IStateSchema)).toBe(false);
  });

  test('Return user state user prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getUserInited(state as IStateSchema)).toBe(false);
  });
});
