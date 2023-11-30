import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { fetchTemplateById } from '../services/fetch-template-by-id/fetchTemplateById';
import { initialTemplateDetailsState } from '../consts/template.consts';
import type { ITemplate } from '../types/template.interface';

export const templateDetailsSlice = buildSlice({
  name: 'templateDetails',
  initialState: initialTemplateDetailsState,
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

export const {
  actions: templateDetailsActions,
  reducer: templateDetailsReducer,
  useActions: useTemplateDetailsActions,
} = templateDetailsSlice;
