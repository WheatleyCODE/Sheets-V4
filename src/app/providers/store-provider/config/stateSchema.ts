import { IModalsSchema } from 'widgets/layout';
import { IUserSchema } from 'entities/user';
import { ILoginSchema } from 'features/auth-by-email';
import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { IProfileSchema } from 'entities/profile';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;

  // * Async
  login?: ILoginSchema;
  profile?: IProfileSchema;
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

export interface IThunkExtra {
  api: AxiosInstance;
  navigate: (to: To, options?: NavigateOptions) => void;
}

export interface IThunkConfig<T> {
  rejectValue: T;
  extra: IThunkExtra;
}
