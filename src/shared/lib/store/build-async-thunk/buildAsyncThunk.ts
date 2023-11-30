import { IThunkConfig } from '@/app/providers/store-provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit/dist';
import { useTypedDispatch } from '../../hooks';
import { useCallback } from 'react';
import type { Result } from './buildAsyncThunk.interface';

export function buildAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): Result<Returned, ThunkArg> {
  const asyncThunk = createAsyncThunk<Returned, ThunkArg, IThunkConfig>(typePrefix, payloadCreator);

  const useThunk = () => {
    const dispatch = useTypedDispatch();

    return useCallback(
      (args: ThunkArg) => {
        return dispatch(asyncThunk(args));
      },
      [dispatch],
    );
  };

  return [useThunk, asyncThunk];
}
