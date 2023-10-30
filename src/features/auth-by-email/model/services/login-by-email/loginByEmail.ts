import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import { IUser, userActions } from 'features/user';
import i18n from 'shared/config/i18n/i18n';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { KVFactory } from 'shared/lib/kv-storage';

export interface ILoginByEmailProps {
  email: string;
  password: string;
}

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const loginByEmail = createAsyncThunk<IUser, ILoginByEmailProps, IThunkConfig>(
  'login/loginByEmail',
  async (loginData, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;
      const { data } = await extra.api.post<IUser>('/login', loginData);

      if (!data) throw new Error();

      ls.set(LS_AUTH_KEY, data);

      thunkAPI.dispatch(userActions.setUser(data));

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Неверная почта или пароль'));
    }
  },
);
