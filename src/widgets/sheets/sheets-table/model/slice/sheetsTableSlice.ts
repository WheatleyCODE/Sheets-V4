import { PayloadAction } from '@reduxjs/toolkit';
import { initialSheetsTableState } from '../consts/sheetsTable.consts';
import { buildSlice } from '@/shared/lib/store';
import type { ISheetsTable } from '../types/sheetsTable.interface';

export const sheetsTableSlice = buildSlice({
  name: 'sheetsTable',
  initialState: initialSheetsTableState,
  reducers: {
    setSheetsTable: (state, { payload }: PayloadAction<ISheetsTable>) => {
      const { id, cols, rows, cells } = payload;

      state.sheetsTable.id = id;
      state.sheetsTable.cols = cols;
      state.sheetsTable.rows = rows;
      state.sheetsTable.cells = cells;
    },
  },
});

export const {
  actions: sheetsTableActions,
  reducer: sheetsTableReducer,
  useActions: useSheetsTableActions,
} = sheetsTableSlice;
