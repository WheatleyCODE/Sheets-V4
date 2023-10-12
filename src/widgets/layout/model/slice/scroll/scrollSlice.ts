import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IScrollSchema } from '../../types/scroll/scrollSchema';

const initialState: IScrollSchema = {
  scroll: {},
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{ path: string; position: number }>) {
      const { path, position } = payload;
      state.scroll[path] = position;
    },
  },
});

export const { actions: scrollActions, reducer: scrollReducer } = scrollSlice;
