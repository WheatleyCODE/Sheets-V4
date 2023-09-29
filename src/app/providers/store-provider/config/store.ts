import { configureStore } from '@reduxjs/toolkit';
import { IStateSchema } from './stateSchema';
import { modalsReducer } from 'app/modal-controller';

export const createReduxStore = (initialState?: IStateSchema) => {
  return configureStore<IStateSchema>({
    reducer: {
      modals: modalsReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
};
