import { ReducersMapObject } from '@reduxjs/toolkit';
import { Theme } from 'app/providers/lib';
import { IStateSchema } from 'app/providers/store-provider';
import { DeepPartial } from '../../ts-utils';

export interface IRenderComponentOptions {
  route?: string;
  initialState?: DeepPartial<IStateSchema>;
  initTheme?: Theme;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}
