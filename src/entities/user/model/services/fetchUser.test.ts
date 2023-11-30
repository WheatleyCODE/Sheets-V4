import { UserRoles } from '../consts/user.consts';
import { IUser } from '../types/user.interface';
import { fetchUser } from './fetchUser';
import { TestAsyncThunk } from '@/shared/lib/tests';

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

describe('fetchUser', () => {
  test('fetchUser rejected', async () => {
    const thunk = new TestAsyncThunk(fetchUser);
    const res = await thunk.callThunk('1');

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toEqual('Ошибка при загрузке пользователя');
  });
});
