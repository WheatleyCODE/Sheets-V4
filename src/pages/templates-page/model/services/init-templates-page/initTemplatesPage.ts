import { IStateSchema } from '@/app/providers/store-provider';
import i18n from '@/shared/config/i18n/i18n';
import { getTemplatesPageInited } from '../../selectors/get-templates-page-inited/getTemplatesPageInited';
import { templatesPageActions } from '../../slice/templatesPageSlice';
import { fetchTemplatesPageTemplates } from '../fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { TemplateTags } from '@/entities/template';
import { TemplateSortFields, TemplateSortOrders } from '../../consts/templatesPage.consts';
import { buildAsyncThunk } from '@/shared/lib/store';

export const [useInitTemplatesPage, initTemplatesPage] = buildAsyncThunk<void, URLSearchParams>(
  'templatesPage/initTemplatesPage',
  async (searchParams, thunkAPI) => {
    try {
      const inited = getTemplatesPageInited(thunkAPI.getState() as IStateSchema);

      if (inited) return;
      const order = searchParams.get('order');
      const sort = searchParams.get('sort');
      const search = searchParams.get('search');
      const tag = searchParams.get('tag');

      if (order) thunkAPI.dispatch(templatesPageActions.setSortOrder(order as TemplateSortOrders));
      if (sort) thunkAPI.dispatch(templatesPageActions.setSort(sort as TemplateSortFields));
      if (search) thunkAPI.dispatch(templatesPageActions.setSearch(search));
      if (tag) thunkAPI.dispatch(templatesPageActions.setTags(tag as TemplateTags));

      thunkAPI.dispatch(templatesPageActions.initState());
      thunkAPI.dispatch(fetchTemplatesPageTemplates());
    } catch (e) {
      console.log(e);

      return thunkAPI.rejectWithValue(i18n.t('Ошибка при инициализации страницы'));
    }
  },
);
