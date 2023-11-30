import { fetchUser } from './fetchUser';
import { TestAsyncThunk } from '@/shared/lib/tests';

describe('fetchUser', () => {
  test('fetchUser rejected', async () => {
    const thunk = new TestAsyncThunk(fetchUser);
    const res = await thunk.callThunk('1');

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toEqual('Ошибка при загрузке пользователя');
  });
});
