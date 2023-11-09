import { PROXY, nonPrimitiveTypes } from '../consts/prelude.consts';
import { extend } from '../extend/extend';

extend(Object, 'isAsyncIterable', (value: any) => {
  if (value == null) return false;

  return Boolean(
    typeof Symbol === 'function' ? value[Symbol.asyncIterator] : typeof value['@@asyncIterator'] === 'function',
  );
});

extend(Object, 'isIterable', (value: any) => {
  if (value == null) {
    return false;
  }

  return Boolean(typeof Symbol === 'function' ? value[Symbol.iterator] : typeof value['@@iterator'] === 'function');
});

extend(Object, 'cast', (value: any) => value);
extend(Object, 'isTruly', (value: any) => Boolean(value));
extend(Object, 'isPrimitive', (value: any) => !value || !nonPrimitiveTypes[typeof value]);
extend(Object, 'isUndef', (value: any) => value === undefined);
extend(Object, 'isNull', (value: any) => value === null);
extend(Object, 'isNullable', (value: any) => value == null);
extend(Object, 'isString', (value: any) => typeof value === 'string');
extend(Object, 'isNumber', (value: any) => typeof value === 'number');
extend(Object, 'isBoolean', (value: any) => typeof value === 'boolean');
extend(Object, 'isFunction', (value: any) => typeof value === 'function');

extend(Object, 'isPromise', (value: any) => {
  if (value) {
    return typeof value.then === 'function' && typeof value.catch === 'function';
  }

  return false;
});

extend(Object, 'isPromiseLike', (value: any) => {
  if (value) {
    return typeof value.then === 'function';
  }

  return false;
});

extend(Object, 'isProxy', (value: any) => value?.[PROXY] != null);
