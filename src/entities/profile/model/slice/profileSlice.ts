import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IProfileSchema } from '../types/profile';

const initialState: IProfileSchema = {
  error: null,
  isLoading: false,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, { payload }: PayloadAction<IProfile>) {
      state.profile = payload;
    },
  },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
