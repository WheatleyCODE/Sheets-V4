import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, userActions } from 'entities/user';
import i18n from 'shared/config/i18n/i18n';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { KVFactory } from 'shared/lib/kv-storage';

export enum LoginErrors {
  INCORRECT_DATA = '',
  SERVER_ERROR = 'd',
}

export interface ILoginByEmailProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<IUser, ILoginByEmailProps, { rejectValue: string }>(
  'login/loginByEmail',
  async (loginData, thunkAPI) => {
    try {
      const { data } = await axios.post<IUser>('http://localhost:8000/login', loginData);

      if (!data) throw new Error();

      thunkAPI.dispatch(userActions.setUser(data));

      const localStorage = KVFactory(LS_DEFAULT_NAMESPACE);
      await localStorage.set(LS_AUTH_KEY, data);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Неверная почта или пароль'));
    }
  },
);
