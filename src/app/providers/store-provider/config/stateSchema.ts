import { IModalsSchema } from 'widgets/layout';
import { IUserSchema } from 'entities/user';
import { ILoginSchema } from 'features/auth-by-email';
import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState } from '@reduxjs/toolkit';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;

  // * Async
  login?: ILoginSchema;
}

export type StateSchemaKey = keyof IStateSchema;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}
