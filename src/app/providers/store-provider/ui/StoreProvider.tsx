import { FC } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { IStateSchema } from '../config/stateSchema';

export interface IStoreProviderProps extends FCProps {
  initialState?: IStateSchema;
}

export const StoreProvider: FC<IStoreProviderProps> = (props) => {
  const { children, initialState } = props;

  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
