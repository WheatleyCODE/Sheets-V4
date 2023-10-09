import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import { IComment } from 'entities/comment';
import i18n from 'shared/config/i18n/i18n';

export const fetchTemplateDetailsComments = createAsyncThunk<IComment[], { id: string }, IThunkConfig>(
  'templateDetails/fetchTemplateDetailsComments',
  async ({ id }, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<IComment[]>('/comments', {
        params: {
          templateId: id,
          _expand: 'user',
        },
      });
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке комментариев'));
    }
  },
);
