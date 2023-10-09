import { IModalsSchema } from 'widgets/layout';
import { IUserSchema } from 'entities/user';
import { ILoginSchema } from 'features/auth-by-email';
import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState, ThunkMiddleware } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { IProfileSchema } from 'entities/profile';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ITemplateDetailsSchema } from 'entities/template';
import { ITemplateDetailsCommentsSchema } from 'pages/template-details-page/model/types/templateDetailsComments';
import { IAddCommentFormSchema } from 'features/add-comment-form';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;

  // * Async
  login?: ILoginSchema;
  profile?: IProfileSchema;
  templateDetails?: ITemplateDetailsSchema;
  templateDetailsComments?: ITemplateDetailsCommentsSchema;
  addCommentForm?: IAddCommentFormSchema;
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
}

export interface IThunkConfig<T = string> {
  rejectValue: T;
  state: any;
}

export interface IStore extends ToolkitStore<IStateSchema, AnyAction, [ThunkMiddleware<unknown, AnyAction>]> {
  reducerManager?: IReducerManager;
}
