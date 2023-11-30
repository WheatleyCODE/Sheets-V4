import { IStateSchema, IThunkExtra } from '@/app/providers/store-provider';
import { ITemplate, TemplateTags } from '@/entities/template';
import i18n from '@/shared/config/i18n/i18n';
import { getTemplatesPageLimit } from '../../selectors/get-templates-page-limit/getTemplatesPageLimit';
import { getTemplatesPagePage } from '../../selectors/get-templates-page-page/getTemplatesPagePage';
import { getTemplatesPageSort } from '../../selectors/get-templates-page-sort/getTemplatesPageSort';
import { getTemplatesPageSortOrder } from '../../selectors/get-templates-page-sort-order/getTemplatesPageSortOrder';
import { getTemplatesPageSearch } from '../../selectors/get-templates-page-search/getTemplatesPageSearch';
import { addQueryParams } from '@/shared/lib/url';
import { getTemplatesPageTag } from '../../selectors/get-templates-page-tag/getTemplatesPageTag';
import { buildAsyncThunk } from '@/shared/lib/store';

export const [useFetchTemplatesPageTemplates, fetchTemplatesPageTemplates] = buildAsyncThunk<
  ITemplate[],
  { isReplace: boolean } | void
>('templatesPage/fetchTemplatesPageTemplates', async (_, thunkAPI) => {
  try {
    const extra = thunkAPI.extra as IThunkExtra;

    const limit = getTemplatesPageLimit(thunkAPI.getState() as IStateSchema);
    const page = getTemplatesPagePage(thunkAPI.getState() as IStateSchema);
    const sort = getTemplatesPageSort(thunkAPI.getState() as IStateSchema);
    const order = getTemplatesPageSortOrder(thunkAPI.getState() as IStateSchema);
    const search = getTemplatesPageSearch(thunkAPI.getState() as IStateSchema);
    const tag = getTemplatesPageTag(thunkAPI.getState() as IStateSchema);

    addQueryParams({ sort, order, search, tag }, true);

    const { data } = await extra.api.get<ITemplate[]>('/templates', {
      params: {
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        tags: tag === TemplateTags.ALL ? undefined : tag,
        q: search,
      },
    });

    if (!data) throw new Error();

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(i18n.t('Ошибка при загрузке шаблонов'));
  }
});
