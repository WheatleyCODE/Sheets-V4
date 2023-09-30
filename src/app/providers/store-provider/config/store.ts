import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from './stateSchema';
import { modalsReducer } from 'app/modal-controller';
import { userReducer } from 'entities/user';

export const createReduxStore = (initialState?: IStateSchema) => {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    modals: modalsReducer,
    user: userReducer,
  };

  return configureStore<IStateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
};
