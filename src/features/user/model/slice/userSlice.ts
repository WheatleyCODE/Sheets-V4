import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types/user';
import { KVFactory } from 'shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts';

const initialState: IUserSchema = {
  _inited: false,
};

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },

    initAuthData: (state) => {
      // * Sync
      ls.get<IUser>(LS_AUTH_KEY).then((user) => {
        if (user) {
          state.user = user;
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
