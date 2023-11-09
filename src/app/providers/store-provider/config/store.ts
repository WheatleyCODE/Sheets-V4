import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { modalsReducer, scrollReducer } from 'widgets/layout';
import { userReducer } from 'features/user';
import { createReducerManager } from './reducerManager';
import { api, rtkApi } from 'shared/api';
import type { IStateSchema, IStore, IThunkExtra } from './store.interface';

export const createReduxStore = (initialState?: IStateSchema, asyncReducers?: ReducersMapObject<IStateSchema>) => {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,
    modals: modalsReducer,
    user: userReducer,
    scroll: scrollReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
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
      }).concat(rtkApi.middleware),
  });

  store.reducerManager = reducerManager;

  return store;
};

export type TypedDispatch = ReturnType<typeof createReduxStore>['dispatch'];
