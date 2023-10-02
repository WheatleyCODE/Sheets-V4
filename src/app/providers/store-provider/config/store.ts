import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema } from './stateSchema';
import { modalsReducer } from 'widgets/layout';
import { userReducer } from 'entities/user';
import { createReducerManager } from './reducerManager';
import { api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';

export const createReduxStore = (
  initialState?: IStateSchema,
  asyncReducers?: ReducersMapObject<IStateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) => {
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
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api,
            navigate,
          },
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type TypedDispatch = ReturnType<typeof createReduxStore>['dispatch'];
