import { Nullable, SyncOrAsyncPromise } from 'shared/lib/ts-utils/utils/tsUtils';

export interface KVStorageEngine {
  get(key: string): SyncOrAsyncPromise<Nullable<string>>;
  set(key: string, value: string): SyncOrAsyncPromise<Nullable<void>>;
  remove(key: string): SyncOrAsyncPromise<Nullable<void>>;
}

export type SerializablePrimitiveValue = Nullable<string | number | boolean>;

export type SerializableValue =
  | SerializablePrimitiveValue
  | SerializablePrimitiveValue[]
  | Record<string, any>
  | { toJSON(): SerializableValue };
