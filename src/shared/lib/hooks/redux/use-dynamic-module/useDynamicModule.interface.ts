import { IStateSchema, StateSchemaKey } from '@/app/providers/store-provider';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<IStateSchema[name]>>;
};
