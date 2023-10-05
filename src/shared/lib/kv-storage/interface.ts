import { CanPromise, Nullable } from 'shared/lib/ts-utils/utils/tsUtils';

export interface KVStorageEngine {
  get(key: string): CanPromise<Nullable<string>>;
  set(key: string, value: string): CanPromise<void>;
  remove(key: string): CanPromise<void>;
}

export type SerializablePrimitiveValue = string | number | boolean | null;

export type SerializableValue =
  | SerializablePrimitiveValue
  | SerializablePrimitiveValue[]
  | Record<string, any>
  | { toJSON(): SerializableValue };
