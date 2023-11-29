import { IStateSchema } from '@/app/providers/store-provider';
import { OptionalRecord } from '../../ts-utils';

export type SchemaKey = keyof IStateSchema;
export type StateKey = keyof IReduxSchema;
export type DefaultValue = string | null | boolean;
export type Selector<T> = (state: IStateSchema) => T;

export type DeepStateSchema = {
  [name in SchemaKey]?: IStateSchema[name] & OptionalRecord<StateKey, DefaultValue>;
};
