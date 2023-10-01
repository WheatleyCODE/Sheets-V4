import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from './stateSchema';
import { modalsReducer } from 'widgets/layout';
import { userReducer } from 'entities/user';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (initialState?: IStateSchema, asyncReducers?: ReducersMapObject<IStateSchema>) => {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,
    modals: modalsReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore<IStateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

const store = createReduxStore();

export type TypedDispatch = typeof store.dispatch;
