import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { initialAddCommentFormState } from '../consts/addCommentForm.consts';

export const addCommentFormSlice = buildSlice({
  name: 'addCommentForm',
  initialState: initialAddCommentFormState,
  reducers: {
    setText(state, { payload }: PayloadAction<string>) {
      state.text = payload;
    },
  },
});

export const {
  actions: addCommentFormActions,
  reducer: addCommentFormReducer,
  useActions: useCommentFormActions,
} = addCommentFormSlice;
