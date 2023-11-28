import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import type { IUser } from '../types/user.interface';
import { fetchUserById } from '../api/userApi';
// import { userActions } from '../slice/userSlice';

export const fetchUser = createAsyncThunk<IUser, string, IThunkConfig>(
  'template/fetchTemplateById',
  async (id, thunkAPI) => {
    try {
      const user = await thunkAPI.dispatch(fetchUserById(id)).unwrap();

      return user;
    } catch (e) {
      console.error(e);
      // thunkAPI.dispatch(userActions.initAuthData());
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке пользователя'));
    }
  },
);
