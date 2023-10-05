import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IProfileSchema } from '../types/profile';
import { fetchProfile } from '../services/fetch-profile/fetchProfile';
import { updateProfile } from '../services/update-profille/updateProfile';

const initialState: IProfileSchema = {
  error: null,
  isLoading: false,
  isReadonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, { payload }: PayloadAction<IProfile>) {
      state.profile = payload;
    },
    updateProfile(state, { payload }: PayloadAction<IProfile>) {
      state.profile = payload;
    },
    setIsReadonly(state, { payload }: PayloadAction<boolean>) {
      state.isReadonly = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProfile.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });
    builder.addCase(fetchProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
