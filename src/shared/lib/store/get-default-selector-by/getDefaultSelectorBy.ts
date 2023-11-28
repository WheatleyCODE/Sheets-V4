import type { SchemaKey, StateKey, DefaultValue, Selector } from './getDefaultSelectorBy.interface';

export function getDefaultSelectorBy<T extends null>(
  schemaKey: SchemaKey,
  stateKey: StateKey,
  value: T | string,
): Selector<T | string>;
export function getDefaultSelectorBy<T extends string>(
  schemaKey: SchemaKey,
  stateKey: StateKey,
  value: null | T,
): Selector<T | null>;
export function getDefaultSelectorBy<T extends boolean>(
  schemaKey: SchemaKey,
  stateKey: StateKey,
  value: boolean,
): Selector<T>;
export function getDefaultSelectorBy<T extends DefaultValue>(
  schemaKey: SchemaKey,
  stateKey: StateKey,
  value: T,
): Selector<T> {
  return (state: any) => {
    try {
      if (!state?.[schemaKey]) {
        // * Async reducer
        return value;
      }

      return state?.[schemaKey][stateKey];
    } catch (e) {
      throw new Error(`${schemaKey} Используемый redux state не наследуется от IReduxSchema`);
    }
  };
}
