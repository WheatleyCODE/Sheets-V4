import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate, TemplateView } from 'entities/template';
import { ITemplatesPageSchema, TemplateSortOrders, TemplateSortFields } from '../types/templatesPage';
import { fetchTemplatesPageTemplates } from '../services/fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { LS_VIEW_KEY } from 'shared/consts';

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
  page: 1,
  _inited: false,
  limit: 9,

  // * Sort
  search: '',
  sort: TemplateSortFields.VIEWS,
  sortOrder: TemplateSortOrders.ASC,
});

export const templatesPageSlice = createSlice({
  name: 'templatesPage',
  initialState,
  reducers: {
    setView(state, { payload }: PayloadAction<TemplateView>) {
      localStorage.setItem(LS_VIEW_KEY, payload);
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
      const view = localStorage.getItem(LS_VIEW_KEY) as TemplateView;

      if (view) {
        state.view = view;
      }

      state.limit = state.view === TemplateView.LINES ? 4 : 9;
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
