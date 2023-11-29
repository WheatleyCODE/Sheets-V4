import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate, TemplateTags, TemplateView } from '@/entities/template';
import { fetchTemplatesPageTemplates } from '../services/fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { LS_VIEW_KEY } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage';
import { SQUARES_TEMPLATE_COUNT } from '@/entities/template';
import { INIT_PAGE_COUNT, TemplateSortFields, TemplateSortOrders } from '../consts/templatesPage.consts';
import type { ITemplatesPageSchema } from '../types/templatesPage.interface';

export const templatesPageAdapter = createEntityAdapter<ITemplate>({
  selectId: (template) => template.id,
});

const initialState = templatesPageAdapter.getInitialState<ITemplatesPageSchema>({
  ids: [],
  isLoading: false,
  entities: {},
  error: null,
  view: TemplateView.SQUARES,
  hasMore: true,
  page: INIT_PAGE_COUNT,
  _inited: false,
  limit: SQUARES_TEMPLATE_COUNT,

  // * Sort
  search: '',
  sort: TemplateSortFields.VIEWS,
  sortOrder: TemplateSortOrders.ASC,
  tag: TemplateTags.ALL,
});

const ls = KVFactory();

export const templatesPageSlice = createSlice({
  name: 'templatesPage',
  initialState,
  reducers: {
    setView(state, { payload }: PayloadAction<TemplateView>) {
      ls.set(LS_VIEW_KEY, payload);
      state.view = payload;
    },
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    setLimit(state, { payload }: PayloadAction<number>) {
      state.limit = payload;
    },
    setHasMore(state, { payload }: PayloadAction<boolean>) {
      state.hasMore = payload;
    },
    initState(state) {
      // * Sync
      ls.get<TemplateView>(LS_VIEW_KEY).then((view) => {
        if (view) {
          state.view = view;
        }
      });

      state.limit = state.view === TemplateView.LINES ? 4 : 12;
      state._inited = true;
    },

    // * Sort
    setSortOrder(state, { payload }: PayloadAction<TemplateSortOrders>) {
      state.sortOrder = payload;
    },
    setSearch(state, { payload }: PayloadAction<string>) {
      state.search = payload;
    },
    setSort(state, { payload }: PayloadAction<TemplateSortFields>) {
      state.sort = payload;
    },
    setTags(state, { payload }: PayloadAction<TemplateTags>) {
      state.tag = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTemplatesPageTemplates.pending, (state, { meta }) => {
      state.error = null;
      state.isLoading = true;

      if (meta.arg?.isReplace) {
        templatesPageAdapter.removeAll(state);
      }
    });
    builder.addCase(fetchTemplatesPageTemplates.fulfilled, (state, { payload, meta }) => {
      state.isLoading = false;
      state.hasMore = payload.length >= state.limit;

      if (meta.arg?.isReplace) {
        templatesPageAdapter.setAll(state, payload);
        return;
      }

      templatesPageAdapter.addMany(state, payload);
    });
    builder.addCase(fetchTemplatesPageTemplates.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templatesPageReducer, actions: templatesPageActions } = templatesPageSlice;
