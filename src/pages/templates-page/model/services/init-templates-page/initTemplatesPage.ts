import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/store-provider';
import i18n from 'shared/config/i18n/i18n';
import { getTemplatesPageInited } from '../../selectors/get-templates-page-inited/getTemplatesPageInited';
import { templatesPageActions } from '../../slice/templatesPageSlice';
import { fetchTemplatesPageTemplates } from '../fetch-templates-page-templates/fetchTemplatesPageTemplates';

export const initTemplatesPage = createAsyncThunk<void, void, IThunkConfig>(
  'templatesPage/initTemplatesPage',
  async (_, thunkAPI) => {
    try {
      const inited = getTemplatesPageInited(thunkAPI.getState());

      if (inited) return;
      thunkAPI.dispatch(templatesPageActions.initState());
      thunkAPI.dispatch(fetchTemplatesPageTemplates());
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при инициализации страницы'));
    }
  },
);
