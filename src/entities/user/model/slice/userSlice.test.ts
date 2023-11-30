import { userActions, userReducer } from './userSlice';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { UserRoles } from '../consts/user.consts';
import type { IUser, IUserSchema } from '../types/user.interface';

const testUser: IUser = {
  id: '1',
  email: 'ya@mail.ru',
  roles: [UserRoles.ADMIN],
  username: 'Admin',
  features: {
    isTemplateRating: true,
  },
  clientSettings: {
    '[[SheetsV4-theme]]': 'light',
  },
  avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
};

describe('loginSlice', () => {
  test('Test user setUser', () => {
    const state: DeepPartial<IUserSchema> = {
      user: undefined,
    };

    expect(userReducer(state as IUserSchema, userActions.setUser(testUser))).toEqual({ user: testUser });
  });

  test('Test user initAuthData', () => {
    const state: DeepPartial<IUserSchema> = {
      _inited: false,
    };

    expect(userReducer(state as IUserSchema, userActions.initAuthData())).toEqual({ _inited: true });
  });

  test('Test user logout', () => {
    const state: DeepPartial<IUserSchema> = {
      user: testUser,
    };

    expect(userReducer(state as IUserSchema, userActions.logout())).toEqual({});
  });
});
