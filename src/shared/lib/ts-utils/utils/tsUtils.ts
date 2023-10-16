import { SyncPromise } from 'shared/lib/promise';

export type Nullable<T> = T | null | undefined;
export type CanPromise<T> = T | Promise<T>;
export type SyncOrAsyncPromise<T> = Promise<T> | SyncPromise<T>;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
