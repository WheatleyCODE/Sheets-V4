import { Nullable, SyncOrAsyncPromise } from '../../ts-utils';

export interface KVStorageEngine {
  get(key: string): SyncOrAsyncPromise<Nullable<string>>;
  set(key: string, value: string): SyncOrAsyncPromise<Nullable<void>>;
  remove(key: string): SyncOrAsyncPromise<Nullable<void>>;
}
