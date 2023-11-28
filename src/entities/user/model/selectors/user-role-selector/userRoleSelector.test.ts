import { DeepPartial } from '@/shared/lib/ts-utils';
import { getUserRoleIsAdmin, getUserRoleIsDeveloper, getUserRoleIsUser } from './userRoleSelector';
import { IStateSchema } from '@/app/providers/store-provider';
import { UserRoles } from '../../consts/user.consts';

describe('userRoleSelectors', () => {
  test('Return user role admin', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.ADMIN] } },
    };

    expect(getUserRoleIsAdmin(state as IStateSchema)).toBe(true);
    expect(getUserRoleIsDeveloper(state as IStateSchema)).toBe(false);
    expect(getUserRoleIsUser(state as IStateSchema)).toBe(false);
  });

  test('Return user role developer', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.DEVELOPER] } },
    };

    expect(getUserRoleIsAdmin(state as IStateSchema)).toBe(false);
    expect(getUserRoleIsDeveloper(state as IStateSchema)).toBe(true);
    expect(getUserRoleIsUser(state as IStateSchema)).toBe(false);
  });

  test('Return user role user', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.USER] } },
    };

    expect(getUserRoleIsAdmin(state as IStateSchema)).toBe(false);
    expect(getUserRoleIsDeveloper(state as IStateSchema)).toBe(false);
    expect(getUserRoleIsUser(state as IStateSchema)).toBe(true);
  });
});
