import { IStateSchema } from '@/app/providers/store-provider';

export type Selector<T, Args extends any[]> = (state: IStateSchema, ...args: Args) => T;
export type Hook<T, Args extends any[]> = (...args: Args) => T;
export type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

export type Hook2<T> = () => T;
export type Result2<T> = [Hook2<T>, Selector<T, void[]>];

export type Selector2<T = any> = (state: IStateSchema) => T;
export type Selector3<T, D> = (state: T) => D;
