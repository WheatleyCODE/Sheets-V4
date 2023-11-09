import { DeepPartial } from 'shared/lib/ts-utils';
import { getUserRoles } from './getUserRoles';
import { IStateSchema } from 'app/providers/store-provider';
import { UserRoles } from '../../consts/user.consts';

describe('getUserRoles', () => {
  test('Return user state roles prop', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { email: 'ya@mail.ru', id: '1', roles: [UserRoles.ADMIN] }, _inited: false },
    };

    expect(getUserRoles(state as IStateSchema)).toStrictEqual([UserRoles.ADMIN]);
  });

  test('Return user state roles prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getUserRoles(state as IStateSchema)).toStrictEqual([]);
  });
});
