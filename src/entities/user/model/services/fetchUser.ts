import i18n from '@/shared/config/i18n/i18n';
import { fetchUserById } from '../api/userApi';
import { buildAsyncThunk } from '@/shared/lib/store';
import type { IUser } from '../types/user.interface';

export const [useFetchUser, fetchUser] = buildAsyncThunk<IUser, string>('template/fetchUser', async (id, thunkAPI) => {
  try {
    const user = await thunkAPI.dispatch(fetchUserById(id)).unwrap();

    return user;
  } catch (e) {
    return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке пользователя'));
  }
});
