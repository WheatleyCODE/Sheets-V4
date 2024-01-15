import { PayloadAction } from '@reduxjs/toolkit';
import { initialSheetsHeaderState } from '../consts/sheetsHeader.consts';
import { buildSlice } from '@/shared/lib/store';
import type { ISheetsHeader } from '../types/sheetsHeader.interface';

export const sheetsHeaderSlice = buildSlice({
  name: 'sheetsHeader',
  initialState: initialSheetsHeaderState,
  reducers: {
    setSheetsHeader(state, { payload }: PayloadAction<ISheetsHeader>) {
      state.sheetsHeader = payload;
    },
  },
});

export const {
  actions: sheetsHeaderActions,
  reducer: sheetsHeaderReducer,
  useActions: useSheetsHeaderActions,
} = sheetsHeaderSlice;
