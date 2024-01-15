import { PayloadAction } from '@reduxjs/toolkit';
import { initialSheetsToolbarState } from '../consts/sheetsToolbar.consts';
import { buildSlice } from '@/shared/lib/store';
import type { ISheetsToolbar } from '../types/sheetsToolbar.interface';

export const sheetsToolbarSlice = buildSlice({
  name: 'sheetsToolbar',
  initialState: initialSheetsToolbarState,
  reducers: {
    setSheetsToolbar(state, { payload }: PayloadAction<ISheetsToolbar>) {
      state.sheetsToolbar = payload;
    },
  },
});

export const {
  actions: sheetsToolbarActions,
  reducer: sheetsToolbarReducer,
  useActions: useSheetsToolbarActions,
} = sheetsToolbarSlice;
