import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { loginByEmail } from '../services/login-by-email/loginByEmail';
import { initialLoginState } from '../consts/authByEmail.consts';

export const loginSlice = buildSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setEmail(state, { payload }: PayloadAction<string>) {
      state.email = payload;
    },

    setPassword(state, { payload }: PayloadAction<string>) {
      state.password = payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(loginByEmail.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(loginByEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginByEmail.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { actions: loginActions, reducer: loginReducer, useActions: useLoginActions } = loginSlice;
