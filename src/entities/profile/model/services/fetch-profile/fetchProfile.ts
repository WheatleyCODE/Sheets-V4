import { IThunkExtra } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import type { IProfile } from '../../types/profile.interface';
import { buildAsyncThunk } from '@/shared/lib/store';

export const [useFetchProfile, fetchProfile] = buildAsyncThunk<IProfile, { userId: string }>(
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
