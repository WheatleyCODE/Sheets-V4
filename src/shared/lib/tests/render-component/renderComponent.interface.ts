import { ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from '@/app/providers/store-provider';
import { DeepPartial } from '../../ts-utils';
import { Theme } from '../../contexts';
import { ReactNode } from 'react';

export interface IRenderComponentOptions {
  route?: string;
  initialState?: DeepPartial<IStateSchema>;
  initTheme?: Theme;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}

export interface ITestProviderProps {
  children: ReactNode;
  options?: IRenderComponentOptions;
}
