export type PromiseState = 'pending' | 'fulfilled' | 'rejected';

export declare type Value<T = unknown> = CanPromiseLike<T>;
export type ConstrResolveHandler<T = unknown> = (value?: Value<T>) => void;
export type ConstrRejectHandler = (reason?: unknown) => void;
export type Executor<T = unknown> = (resolve: ConstrResolveHandler<T>, reject: ConstrRejectHandler) => void;

export declare type ResolveHandler<V = unknown, R = V> = Function | ((value: V) => Value<R>);

export declare type RejectHandler<T = unknown> = ResolveHandler<unknown, T>;
