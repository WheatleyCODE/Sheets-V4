import { IThunkExtra } from '@/app/providers/store-provider';
import { buildAsyncThunk } from '@/shared/lib/store';
import i18n from '@/shared/config/i18n/i18n';
import type { ITemplate } from '../../types/template.interface';

export const [useFetchTemplateById, fetchTemplateById] = buildAsyncThunk<ITemplate, { id: string }>(
  'template/fetchTemplateById',
  async ({ id }, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<ITemplate>(`/templates/${id}`, {
        params: {
          _expand: 'user',
        },
      });
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке шаблона'));
    }
  },
);
