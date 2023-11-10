import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import { getTemplatesPagePage } from '../../selectors/get-templates-page-page/getTemplatesPagePage';
import { getTemplatesPageHasMore } from '../../selectors/get-templates-page-has-more/getTemplatesPageHasMore';
import { getTemplatesPageIsLoading } from '../../selectors/get-templates-page-is-loading/getTemplatesPageIsLoading';
import { templatesPageActions } from '../../slice/templatesPageSlice';
import { fetchTemplatesPageTemplates } from '../fetch-templates-page-templates/fetchTemplatesPageTemplates';

export const fetchTemplatesPageNextTemplates = createAsyncThunk<void, void, IThunkConfig>(
  'templatesPage/fetchTemplatesNextPageTemplates',
  async (_, thunkAPI) => {
    try {
      const isLoading = getTemplatesPageIsLoading(thunkAPI.getState());
      const hasMore = getTemplatesPageHasMore(thunkAPI.getState());
      const page = getTemplatesPagePage(thunkAPI.getState());

      if (hasMore && !isLoading) {
        thunkAPI.dispatch(templatesPageActions.setPage(page + 1));
        thunkAPI.dispatch(fetchTemplatesPageTemplates());
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке шаблонов'));
    }
  },
);
