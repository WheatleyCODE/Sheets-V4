import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from './stateSchema';
import { modalsReducer } from 'widgets/layout';
import { userReducer } from 'entities/user';
import { loginReducer } from 'features/auth-by-email';

export const createReduxStore = (initialState?: IStateSchema) => {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    modals: modalsReducer,
    user: userReducer,
    login: loginReducer,
  };

  return configureStore<IStateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
};

const store = createReduxStore();

export type TypedDispatch = typeof store.dispatch;
