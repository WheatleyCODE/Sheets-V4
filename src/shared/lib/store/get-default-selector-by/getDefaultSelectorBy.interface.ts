import { IStateSchema } from '@/app/providers/store-provider';

export type SchemaKey = keyof IStateSchema;
export type StateKey = keyof IReduxSchema;
export type DefaultValue = string | null | boolean;
export type Selector<T> = (state: IStateSchema) => T;
