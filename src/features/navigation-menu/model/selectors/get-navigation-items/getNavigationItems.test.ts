import { DeepPartial } from '@/shared/lib/ts-utils';
import { getNavigationItems } from './getNavigationItems';
import { IStateSchema } from '@/app/providers/store-provider';
import { UserRoles } from '@/entities/user';

describe('getNavigationItems', () => {
  test('Return navigation menu items, no auth', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getNavigationItems(state as IStateSchema).length).toBe(3);
  });

  test('Return navigation menu items, auth', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.USER] } },
    };

    expect(getNavigationItems(state as IStateSchema).length).toBe(6);
  });

  test('Return navigation menu items, auth admin', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.ADMIN] } },
    };

    expect(getNavigationItems(state as IStateSchema).length).toBe(7);
  });

  test('Return navigation menu items, auth developer', () => {
    const state: DeepPartial<IStateSchema> = {
      user: { user: { roles: [UserRoles.DEVELOPER] } },
    };

    expect(getNavigationItems(state as IStateSchema).length).toBe(7);
  });
});
