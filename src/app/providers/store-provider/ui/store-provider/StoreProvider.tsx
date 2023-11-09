import { FC } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../config/store';
import { IStateSchema } from '../../config/store.interface';
import { ReducersMapObject } from '@reduxjs/toolkit';
import type { IStoreProviderProps } from './StoreProvider.interface';

export const StoreProvider: FC<IStoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(initialState, asyncReducers as ReducersMapObject<IStateSchema>);

  return <Provider store={store}>{children}</Provider>;
};
