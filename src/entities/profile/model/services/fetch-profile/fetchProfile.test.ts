import { profileTests } from '../../consts/profile.consts';
import { fetchProfile } from './fetchProfile';
import { TestAsyncThunk } from 'shared/lib/tests';

describe('fetchProfile', () => {
  test('Fulfilled', async () => {
    const thunk = new TestAsyncThunk(fetchProfile);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: profileTests }));

    const res = await thunk.callThunk({ userId: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(profileTests);
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchProfile);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ userId: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при загрузке профиля');
  });
});
