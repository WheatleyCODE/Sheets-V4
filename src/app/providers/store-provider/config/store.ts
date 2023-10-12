import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { modalsReducer, scrollReducer } from 'widgets/layout';
import { userReducer } from 'entities/user';
import { createReducerManager } from './reducerManager';
import { IStateSchema, IStore, IThunkExtra } from './stateSchema';
import { api } from 'shared/api';

export const createReduxStore = (initialState?: IStateSchema, asyncReducers?: ReducersMapObject<IStateSchema>) => {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,
    modals: modalsReducer,
    user: userReducer,
    scroll: scrollReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArgument: IThunkExtra = {
    api,
  };

  const store: IStore = configureStore<IStateSchema>({
    reducer: reducerManager.reduce as Reducer<CombinedState<IStateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }),
  });

  store.reducerManager = reducerManager;

  return store;
};

export type TypedDispatch = ReturnType<typeof createReduxStore>['dispatch'];
