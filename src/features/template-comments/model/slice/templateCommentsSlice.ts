import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'entities/comment';
import { ITemplateCommentsSchema } from '../types/templateComments';
import { fetchTemplateComments } from '../services/fetch-template-comments/fetchTemplateComments';

export const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
});

const initialState = commentsAdapter.getInitialState<ITemplateCommentsSchema>({
  error: null,
  isLoading: false,
  ids: [],
  entities: {},
});

export const templateCommentsSlice = createSlice({
  name: 'templateComments',
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<IComment>) {
      commentsAdapter.addOne(state, payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTemplateComments.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplateComments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchTemplateComments.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { reducer: templateCommentsReducer, actions: templateCommentsActions } = templateCommentsSlice;
