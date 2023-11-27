import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KVFactory } from '@/shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from '@/shared/consts';
import { initialUserState } from '../consts/user.consts';
import { setFeatureFlags } from '@/shared/lib/features';
import type { IUser } from '../types/user.interface';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

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
      // * Sync
      ls.get<IUser>(LS_AUTH_KEY).then((user) => {
        if (user) {
          state.user = user;

          if (user.features) {
            setFeatureFlags(user.features);
          }
        }
      });

      state._inited = true;
    },

    logout(state) {
      state.user = undefined;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
