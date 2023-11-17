import { IOptsIntoIterator } from '../types/interface';

export function* intoIterator(obj: any, opts?: IOptsIntoIterator) {
  if (obj == null) return;

  if (obj[Symbol.iterator] != null) {
    yield* obj[Symbol.iterator]();
    return;
  }

  if (typeof obj === 'object') {
    if (opts?.type === 'key') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          yield key;
        }
      }
    }

    if (opts?.type === 'entries') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          yield [key, obj[key]];
        }
      }
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
