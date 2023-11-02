import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate, ITemplateDetailsSchema } from '../types/template';
import { fetchTemplateById } from '../services/fetch-template-by-id/fetchTemplateById';

const initialState: ITemplateDetailsSchema = {
  isLoading: false,
  error: null,
};

export const templateDetailsSlice = createSlice({
  name: 'templateDetails',
  initialState,
  reducers: {
    setTemplate(state, { payload }: PayloadAction<ITemplate>) {
      state.template = payload;
    },

    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTemplateById.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchTemplateById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.template = payload;
    });
    builder.addCase(fetchTemplateById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { actions: templateDetailsActions, reducer: templateDetailsReducer } = templateDetailsSlice;
