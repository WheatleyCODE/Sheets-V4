import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import { ITemplate } from 'entities/template';
import i18n from 'shared/config/i18n/i18n';
import { getTemplatesPageLimit } from '../../selectors/get-templates-page-limit/getTemplatesPageLimit';
import { getTemplatesPagePage } from '../../selectors/get-templates-page-page/getTemplatesPagePage';

// export interface IFetchTemplatesParams {
//   page?: number;
//   limit?: number;
// }

export const fetchTemplatesPageTemplates = createAsyncThunk<ITemplate[], void, IThunkConfig>(
  'templatesPage/fetchTemplatesPageTemplates',
  async (params, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const limit = getTemplatesPageLimit(thunkAPI.getState());
      const page = getTemplatesPagePage(thunkAPI.getState());

      const { data } = await extra.api.get<ITemplate[]>('/templates', {
        params: {
          _limit: limit,
          _page: page,
        },
      });

      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке шаблонов'));
    }
  },
);
