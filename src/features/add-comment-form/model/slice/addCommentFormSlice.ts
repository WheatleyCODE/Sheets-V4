import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAddCommentFormSchema } from '../types/addCommentForm';

const initialState: IAddCommentFormSchema = {
  isLoading: false,
  error: null,
  text: '',
};

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText(state, { payload }: PayloadAction<string>) {
      state.text = payload;
    },
  },
});

export const { actions: addCommentFormActions, reducer: addCommentFormReducer } = addCommentFormSlice;
