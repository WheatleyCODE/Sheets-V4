import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialScrollState } from '../../consts/layout.consts';

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState: initialScrollState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{ path: string; position: number }>) {
      const { path, position } = payload;
      state.scroll[path] = position;
    },
  },
});

export const { actions: scrollActions, reducer: scrollReducer } = scrollSlice;
