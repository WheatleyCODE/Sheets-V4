import { updateProfile } from './updateProfile';
import { TestAsyncThunk } from '@/shared/lib/tests';
import { IProfile } from '../../types/profile.interface';
import { Country, Currency } from '../../consts/profile.consts';

describe('updateProfile', () => {
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

    const thunk = new TestAsyncThunk(updateProfile);
    thunk.api.put.mockReturnValue(Promise.resolve({ data: profile }));

    const res = await thunk.callThunk(profile);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(profile);
  });

  test('Rejected', async () => {
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

    const thunk = new TestAsyncThunk(updateProfile);
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk(profile);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при обновлении пользователя');
  });
});
