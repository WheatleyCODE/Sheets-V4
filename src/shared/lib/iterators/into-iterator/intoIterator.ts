export function* intoIterator<T = unknown, TReturn = any, TNext = unknown>(obj: any): Generator<T, TReturn, TNext> {
  if (obj == null) return;

  if (obj[Symbol.iterator] != null) {
    yield* obj[Symbol.iterator]();
    return;
  }

  if (typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        yield obj[key];
      }
    }

    return;
  }

  yield obj;
}
