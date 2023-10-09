import { fetchProfile } from './fetchProfile';
import { TestAsyncThunk } from 'shared/lib/tests';
import { Country, Currency, IProfile } from '../../types/profile';

describe('fetchProfile', () => {
  test('Fulfilled', async () => {
    const profile: IProfile = {
      userId: '1',
      firstname: 'Вася',
      lastname: 'Пупкин',
      age: '65',
      currency: Currency.USD,
      country: Country.RUSSIA,
      city: 'Благовещенск',
      username: 'Vasya28RUS',
      avatar: 'http://...',
    };

    const thunk = new TestAsyncThunk(fetchProfile);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: profile }));

    const res = await thunk.callThunk({ userId: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(profile);
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
