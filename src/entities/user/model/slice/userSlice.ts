import { PayloadAction } from '@reduxjs/toolkit';
import { initialUserState } from '../consts/user.consts';
import { setFeatureFlags } from '@/shared/lib/features';
import { normalizeClientSettings } from '@/shared/lib/utils';
import { fetchUser } from '../services/fetchUser';
import { buildSlice } from '@/shared/lib/store';
import type { IUser } from '../types/user.interface';

export const userSlice = buildSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser>) {
      if (payload?.clientSettings) {
        state.user = {
          ...payload,
          clientSettings: normalizeClientSettings(payload.clientSettings),
        };
      } else {
        state.user = payload;
      }

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
      if (payload?.clientSettings) {
        state.user = {
          ...payload,
          clientSettings: normalizeClientSettings(payload.clientSettings),
        };
      } else {
        state.user = payload;
      }

      state.isLoading = false;
      state._inited = true;

      if (payload.features) {
        setFeatureFlags(payload.features);
      }
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
      state._inited = true;
    });
  },
});

export const { actions: userActions, reducer: userReducer, useActions: useUserActions } = userSlice;
