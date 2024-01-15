import { PayloadAction } from '@reduxjs/toolkit';
import { initialSheetsFormulaState } from '../consts/sheetsFormula.consts';
import { buildSlice } from '@/shared/lib/store';
import type { ISheetsFormula } from '../types/sheetsFormula.interface';

export const sheetsFormulaSlice = buildSlice({
  name: 'sheetsFormula',
  initialState: initialSheetsFormulaState,
  reducers: {
    setSheetsFormula(state, { payload }: PayloadAction<ISheetsFormula>) {
      state.sheetsFormula = payload;
    },
  },
});

export const {
  actions: sheetsFormulaActions,
  reducer: sheetsFormulaReducer,
  useActions: useSheetsFormulaActions,
} = sheetsFormulaSlice;
