import { FC } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { IStateSchema } from '../config/stateSchema';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export interface IStoreProviderProps extends FCProps {
  initialState?: IStateSchema;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}

export const StoreProvider: FC<IStoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props;

  const navigate = useNavigate();
  const store = createReduxStore(initialState, asyncReducers as ReducersMapObject<IStateSchema>, navigate);

  return <Provider store={store}>{children}</Provider>;
};
