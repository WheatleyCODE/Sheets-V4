import { ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from '../../config/store.interface';
import { DeepPartial } from '@/shared/lib/ts-utils';

export interface IStoreProviderProps extends FCProps {
  initialState?: IStateSchema;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}
