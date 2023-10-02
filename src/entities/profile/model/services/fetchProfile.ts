import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/store-provider';
import i18n from 'shared/config/i18n/i18n';
import { IProfile } from '../types/profile';

export const fetchProfile = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
  'profile/fetchProfile',
  async (_, { extra, rejectWithValue }) => {
    try {
      const { data } = await extra.api.get<IProfile>('/profile');
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return rejectWithValue(i18n.t('Неверная почта или пароль'));
    }
  },
);
