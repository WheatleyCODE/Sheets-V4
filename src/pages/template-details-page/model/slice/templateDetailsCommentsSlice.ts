import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IComment } from 'entities/comment';
import { ITemplateDetailsCommentsSchema } from '../types/templateDetailsComments';
import { fetchTemplateDetailsComments } from '../services/fetchTemplateDetailsComments';

export const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (book) => book.id,
});

const initialState = commentsAdapter.getInitialState<ITemplateDetailsCommentsSchema>({
  error: null,
  isLoading: false,
  ids: [],
  entities: {},
});

export const templateDetailsCommentsSlice = createSlice({
  name: 'templateDetailsComments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTemplateDetailsComments.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplateDetailsComments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchTemplateDetailsComments.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templateDetailsCommentsReducer, actions: templateDetailsCommentsActions } =
  templateDetailsCommentsSlice;
