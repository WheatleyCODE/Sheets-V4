import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import i18n from 'shared/config/i18n/i18n';
import { ITemplate } from '../../types/template';

export const fetchTemplateById = createAsyncThunk<ITemplate, { id: string }, IThunkConfig>(
  'template/fetchTemplateById',
  async ({ id }, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<ITemplate>(`/templates/${id}`);
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке шаблона'));
    }
  },
);
