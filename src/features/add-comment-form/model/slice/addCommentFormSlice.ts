import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialAddCommentFormState } from '../consts/addCommentForm.consts';

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState: initialAddCommentFormState,
  reducers: {
    setText(state, { payload }: PayloadAction<string>) {
      state.text = payload;
    },
  },
});

export const { actions: addCommentFormActions, reducer: addCommentFormReducer } = addCommentFormSlice;
