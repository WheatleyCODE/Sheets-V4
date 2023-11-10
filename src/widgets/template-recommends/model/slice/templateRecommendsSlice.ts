import { ITemplateRecommendsSchema } from '../types/templateRecommends.interface';
import { fetchTemplateRecommends } from '../services/fetch-template-recommends/fetchTemplateRecommends';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ITemplate } from '@/entities/template';

export const recommendsAdapter = createEntityAdapter<ITemplate>({
  selectId: (templates) => templates.id,
});

const initialState = recommendsAdapter.getInitialState<ITemplateRecommendsSchema>({
  error: null,
  isLoading: false,
  ids: [],
  entities: {},
});

export const templateRecommendsSlice = createSlice({
  name: 'templateRecommends',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTemplateRecommends.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplateRecommends.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      recommendsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchTemplateRecommends.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templateRecommendsReducer, actions: templateRecommendsActions } = templateRecommendsSlice;
