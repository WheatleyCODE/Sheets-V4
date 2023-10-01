import axios from 'axios';
import { loginByEmail } from './loginByEmail';
import { userActions } from 'entities/user';
import { TestAsyncThunk } from 'shared/lib/tests';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('loginByEmail', () => {
  test('Fulfilled', async () => {
    const user = { email: 'ya@mail.ru', id: '1' };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: user }));

    const thunk = new TestAsyncThunk(loginByEmail);
    const res = await thunk.callThunk({ email: '123', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUser(user));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(user);
  });

  test('Rejected', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const thunk = new TestAsyncThunk(loginByEmail);
    const res = await thunk.callThunk({ email: '123', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Неверная почта или пароль');
  });
});
