import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/store-provider';
import { IUser, userActions } from 'entities/user';
import i18n from 'shared/config/i18n/i18n';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { KVFactory } from 'shared/lib/kv-storage';

export interface ILoginByEmailProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<IUser, ILoginByEmailProps, IThunkConfig<string>>(
  'login/loginByEmail',
  async (loginData, { dispatch, extra, rejectWithValue }) => {
    try {
      const { data } = await extra.api.post<IUser>('/login', loginData);

      if (!data) throw new Error();

      const localStorage = KVFactory(LS_DEFAULT_NAMESPACE);
      await localStorage.set(LS_AUTH_KEY, data);

      dispatch(userActions.setUser(data));

      return data;
    } catch (e) {
      return rejectWithValue(i18n.t('Неверная почта или пароль'));
    }
  },
);
