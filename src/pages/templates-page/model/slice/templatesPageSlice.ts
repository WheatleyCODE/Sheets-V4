import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate, TemplateView } from 'entities/template';
import { ITemplatesPageSchema } from '../types/templatesPage';
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
  },
  extraReducers(builder) {
    builder.addCase(fetchTemplatesPageTemplates.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplatesPageTemplates.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      templatesPageAdapter.addMany(state, payload);
      state.hasMore = payload.length > 1;
    });
    builder.addCase(fetchTemplatesPageTemplates.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templatesPageReducer, actions: templatesPageActions } = templatesPageSlice;
