import { IModalsSchema, IScrollSchema } from 'widgets/layout';
import { IUserSchema } from 'features/user';
import { ILoginSchema } from 'features/auth-by-email';
import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState, ThunkMiddleware } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { IProfileSchema } from 'entities/profile';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ITemplateDetailsSchema } from 'entities/template';
import { ITemplateDetailsCommentsSchema } from 'pages/template-details-page';
import { IAddCommentFormSchema } from 'features/add-comment-form';
import { ITemplatesPageSchema } from 'pages/templates-page';
import { OptionalRecord } from 'shared/lib/ts-utils';
import { ITemplateRecommendsSchema } from 'features/template-recommends';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;
  scroll: IScrollSchema;

  // * Async
  login?: ILoginSchema;
  profile?: IProfileSchema;
  templateDetails?: ITemplateDetailsSchema;
  templateDetailsComments?: ITemplateDetailsCommentsSchema;
  templateRecommends?: ITemplateRecommendsSchema;
  addCommentForm?: IAddCommentFormSchema;
  templatesPage?: ITemplatesPageSchema;
}

export type StateSchemaKey = keyof IStateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
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
