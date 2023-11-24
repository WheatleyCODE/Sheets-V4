import { DeepPartial } from '@/shared/lib/ts-utils';
import { isUserRoleAdmin, isUserRoleDeveloper, isUserRoleUser } from './userRoleSelector';
import { IStateSchema } from '@/app/providers/store-provider';
import { UserRoles } from '../../consts/user.consts';

describe('userRoleSelectors', () => {
  test('Return user role admin', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.ADMIN] } },
    };

    expect(isUserRoleAdmin(state as IStateSchema)).toBe(true);
    expect(isUserRoleDeveloper(state as IStateSchema)).toBe(false);
    expect(isUserRoleUser(state as IStateSchema)).toBe(false);
  });

  test('Return user role developer', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.DEVELOPER] } },
    };

    expect(isUserRoleAdmin(state as IStateSchema)).toBe(false);
    expect(isUserRoleDeveloper(state as IStateSchema)).toBe(true);
    expect(isUserRoleUser(state as IStateSchema)).toBe(false);
  });

  test('Return user role user', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.USER] } },
    };

    expect(isUserRoleAdmin(state as IStateSchema)).toBe(false);
    expect(isUserRoleDeveloper(state as IStateSchema)).toBe(false);
    expect(isUserRoleUser(state as IStateSchema)).toBe(true);
  });
});
