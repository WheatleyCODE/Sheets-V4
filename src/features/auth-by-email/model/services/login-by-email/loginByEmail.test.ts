import { loginByEmail } from './loginByEmail';
import { userActions } from 'entities/user';
import { TestAsyncThunk } from 'shared/lib/tests';

describe('loginByEmail', () => {
  test('Fulfilled', async () => {
    const user = { email: 'ya@mail.ru', id: '1' };

    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: user }));

    const res = await thunk.callThunk({ email: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUser(user));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(user);
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ email: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Неверная почта или пароль');
  });
});
