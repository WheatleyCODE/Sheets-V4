import { ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from '@/app/providers/store-provider';
import { DeepPartial } from '../../ts-utils';
import { Theme } from '../../contexts';

export interface IRenderComponentOptions {
  route?: string;
  initialState?: DeepPartial<IStateSchema>;
  initTheme?: Theme;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}