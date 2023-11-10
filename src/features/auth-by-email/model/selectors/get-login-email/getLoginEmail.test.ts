import { DeepPartial } from '@/shared/lib/ts-utils';
import { getLoginEmail } from './getLoginEmail';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getLoginEmail', () => {
  test('Return login state email prop', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { email: 'ya@mail.ru' },
    };

    expect(getLoginEmail(state as IStateSchema)).toBe('ya@mail.ru');
  });

  test('Return login state email prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginEmail(state as IStateSchema)).toBe('');
  });
});
