import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import { LS_AUTH_KEY } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage';
import { IUser, userActions } from '@/entities/user';
import type { ILoginByEmailProps } from './loginByEmail.interface';

const ls = KVFactory();

export const loginByEmail = createAsyncThunk<IUser, ILoginByEmailProps, IThunkConfig>(
  'login/loginByEmail',
  async (loginData, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;
      const { data } = await extra.api.post<IUser>('/login', loginData);

      if (!data) throw new Error();

      ls.set(LS_AUTH_KEY, data.id);

      thunkAPI.dispatch(userActions.setUser(data));

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Неверная почта или пароль'));
    }
  },
);
