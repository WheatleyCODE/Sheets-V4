import { IStateSchema } from '@/app/providers/store-provider';

export type Selector<T> = (state: IStateSchema) => T;
export type Result<T> = [() => T, Selector<T>];
