import { buildSlice } from '@/shared/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalsKeys } from '../../types/modal/modal.interface';
import { initialModalState } from '../../consts/layout.consts';

export const modalsSlice = buildSlice({
  name: 'modals',
  initialState: initialModalState,
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

export const { actions: modalsActions, reducer: modalsReducer, useActions: useModalsActions } = modalsSlice;
