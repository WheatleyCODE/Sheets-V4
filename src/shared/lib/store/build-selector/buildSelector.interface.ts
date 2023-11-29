import { IStateSchema } from '@/app/providers/store-provider';

export type Selector<T, Args extends any[]> = (state: IStateSchema, ...args: Args) => T;
export type Hook<T, Args extends any[]> = (...args: Args) => T;
export type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];
