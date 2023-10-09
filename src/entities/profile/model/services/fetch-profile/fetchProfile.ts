import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import i18n from 'shared/config/i18n/i18n';
import { IProfile } from '../../types/profile';

export const fetchProfile = createAsyncThunk<IProfile, { userId: string }, IThunkConfig>(
  'profile/fetchProfile',
  async ({ userId }, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<IProfile>(`/profile/${userId}`);
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке профиля'));
    }
  },
);
