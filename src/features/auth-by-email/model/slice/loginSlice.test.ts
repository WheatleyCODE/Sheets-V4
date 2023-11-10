import { loginActions, loginReducer } from './loginSlice';
import { ILoginSchema } from '../types/login.interface';
import { DeepPartial } from '@/shared/lib/ts-utils';

describe('loginSlice', () => {
  test('Test login setEmail', () => {
    const state: DeepPartial<ILoginSchema> = {
      email: '',
    };

    expect(loginReducer(state as ILoginSchema, loginActions.setEmail('ya@mail.ru'))).toEqual({
      email: 'ya@mail.ru',
    });
  });

  test('Test login setPassword', () => {
    const state: DeepPartial<ILoginSchema> = {
      password: '',
    };

    expect(loginReducer(state as ILoginSchema, loginActions.setPassword('123456'))).toEqual({ password: '123456' });
  });
});
