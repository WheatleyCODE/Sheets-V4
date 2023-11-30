import { buildSlice } from '@/shared/lib/store';
import { initialScrollState } from '../../consts/layout.consts';
import type { PayloadAction } from '@reduxjs/toolkit';

export const scrollSlice = buildSlice({
  name: 'scroll',
  initialState: initialScrollState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{ path: string; position: number }>) {
      const { path, position } = payload;
      state.scroll[path] = position;

      console.log(state.scroll[path]);
    },
  },
});

export const { actions: scrollActions, reducer: scrollReducer, useActions: useScrollActions } = scrollSlice;
