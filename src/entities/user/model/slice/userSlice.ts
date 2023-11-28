import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState } from '../consts/user.consts';
import { setFeatureFlags } from '@/shared/lib/features';
import type { IUser } from '../types/user.interface';
import { fetchUser } from '../services/fetchUser';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;

      if (payload.features) {
        setFeatureFlags(payload.features);
      }
    },

    initAuthData: (state) => {
      state._inited = true;
    },

    logout(state) {
      state.user = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state._inited = true;

      if (payload.features) {
        setFeatureFlags(payload.features);
      }
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
