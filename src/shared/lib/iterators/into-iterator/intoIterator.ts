import { IterReturnObjectType } from '../types/interface';

export function* intoIterator(obj: any, type?: IterReturnObjectType) {
  if (obj == null) return;

  if (obj[Symbol.iterator] != null) {
    yield* obj[Symbol.iterator]();
    return;
  }

  if (typeof obj === 'object') {
    if (type === 'keys') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          yield key;
        }
      }

      return;
    }

    if (type === 'entries') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          yield [key, obj[key]];
        }
      }

      return;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        yield obj[key];
      }
    }

    return;
  }

  yield obj;
}
