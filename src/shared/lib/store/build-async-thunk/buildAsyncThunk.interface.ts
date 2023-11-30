import { IThunkConfig } from '@/app/providers/store-provider';
import { AsyncThunk } from '@reduxjs/toolkit';

export type Result<Returned, ThunkArg> = [
  () => (args: ThunkArg) => Promise<any>,
  AsyncThunk<Returned, ThunkArg, IThunkConfig>,
];
