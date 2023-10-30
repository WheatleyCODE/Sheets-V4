import { extend } from '../extend/extend';

extend(Object, 'cast', (value: any) => value);
extend(Object, 'isTruly', (value: any) => Boolean(value));

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
