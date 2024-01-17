export function intoIter<T>(iterable: Iterable<T>): IterableIterator<T> {
  return intoIterableIter(iterable[Symbol.iterator]());
}

export function intoIterableIter<T>(iter: Iterator<T>): IterableIterator<T> {
  // @ts-ignore
  if (typeof iter?.[Symbol.iterator] === 'function') {
    return iter as IterableIterator<T>;
  }

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      return iter.next();
    },
  };
}
