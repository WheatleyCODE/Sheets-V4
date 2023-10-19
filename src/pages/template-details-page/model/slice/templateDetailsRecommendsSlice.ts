import { ITemplateDetailsRecommendsSchema } from '../types/templateDetailsRecommends';
import { fetchTemplateDetailsRecommends } from '../services/fetch-template-details-recommends/fetchTemplateDetailsRecommends';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ITemplate } from 'entities/template';

export const recommendsAdapter = createEntityAdapter<ITemplate>({
  selectId: (templates) => templates.id,
});

const initialState = recommendsAdapter.getInitialState<ITemplateDetailsRecommendsSchema>({
  error: null,
  isLoading: false,
  ids: [],
  entities: {},
});

export const templateDetailsRecommendsSlice = createSlice({
  name: 'templateDetailsRecommends',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTemplateDetailsRecommends.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplateDetailsRecommends.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      recommendsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchTemplateDetailsRecommends.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templateDetailsRecommendsReducer, actions: templateDetailsRecommendsActions } =
  templateDetailsRecommendsSlice;
