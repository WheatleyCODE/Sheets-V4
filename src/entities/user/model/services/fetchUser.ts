import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import type { IUser } from '../types/user.interface';
import { fetchUserById } from '../api/userApi';

export const fetchUser = createAsyncThunk<IUser, string, IThunkConfig>('template/fetchUser', async (id, thunkAPI) => {
  try {
    const user = await thunkAPI.dispatch(fetchUserById(id)).unwrap();

    return user;
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке пользователя'));
  }
});
