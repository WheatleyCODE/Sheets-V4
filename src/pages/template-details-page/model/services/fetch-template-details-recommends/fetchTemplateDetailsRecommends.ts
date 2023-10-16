import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import { ITemplate } from 'entities/template';
import i18n from 'shared/config/i18n/i18n';

export const fetchTemplateDetailsRecommends = createAsyncThunk<ITemplate[], void, IThunkConfig>(
  'templateDetails/fetchTemplateDetailsRecommends',
  async (_, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<ITemplate[]>('/templates', {
        params: {
          _limit: 3,
          _page: 1,
        },
      });

      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке рекомендуемых'));
    }
  },
);
