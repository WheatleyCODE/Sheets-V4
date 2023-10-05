export type Nullable<T> = T | null | undefined;
export type CanPromise<T> = T | Promise<T>;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
