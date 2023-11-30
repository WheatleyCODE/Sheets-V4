import { AxiosInstance } from 'axios';
import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState, ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ITemplatesPageSchema } from '@/pages/templates-page';
import { IModalsSchema, IScrollSchema } from '../../../layout';
import { ITemplateRecommendsSchema } from '@/widgets/template-recommends';
import { ITemplateCommentsSchema } from '@/widgets/template-comments';
import { IUserSchema } from '@/entities/user';
import { ILoginSchema } from '@/features/auth-by-email';
import { IAddCommentFormSchema } from '@/features/add-comment-form';
import { IProfileSchema } from '@/entities/profile';
import { ITemplateDetailsSchema } from '@/entities/template';
import { OptionalRecord } from '@/shared/lib/ts-utils';
import { rtkApi } from '@/shared/api';

export interface IStateSchema {
  modals: IModalsSchema;
  user: IUserSchema;
  scroll: IScrollSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // * Async
  login?: ILoginSchema;
  profile?: IProfileSchema;
  templateDetails?: ITemplateDetailsSchema;
  templateComments?: ITemplateCommentsSchema;
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
