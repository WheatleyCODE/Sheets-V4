import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types/user';

const initialState: IUserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
      state._inited = true;
    },

    logout(state) {
      state.user = undefined;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
