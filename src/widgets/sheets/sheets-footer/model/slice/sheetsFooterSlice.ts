import { PayloadAction } from '@reduxjs/toolkit';
import { initialSheetsFooterState } from '../consts/sheetsFooter.consts';
import { buildSlice } from '@/shared/lib/store';
import type { ISheetsFooter } from '../types/sheetsFooter.interface';

export const sheetsFooterSlice = buildSlice({
  name: 'sheetsFooter',
  initialState: initialSheetsFooterState,
  reducers: {
    setSheetsFooter(state, { payload }: PayloadAction<ISheetsFooter>) {
      state.sheetsFooter = payload;
    },
  },
});

export const {
  actions: sheetsFooterActions,
  reducer: sheetsFooterReducer,
  useActions: useSheetsFooterActions,
} = sheetsFooterSlice;
