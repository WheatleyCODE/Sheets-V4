import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IModalsSchema, ModalsKeys } from '../types/counterSchema';

const initialState: IModalsSchema = {
  isAuth: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModalByKey(state, { payload }: PayloadAction<ModalsKeys>) {
      state[payload] = true;
    },

    closeModalByKey(state, { payload }: PayloadAction<ModalsKeys>) {
      state[payload] = false;
    },

    toggleModalByKey(state, { payload }: PayloadAction<ModalsKeys>) {
      state[payload] = !state[payload];
    },
  },
});

export const { actions: modalsActions, reducer: modalsReducer } = modalsSlice;
