import { intoIter } from '../into-iter/intoIter';

export function seqIterable<T = unknown>(...iterables: Iterable<unknown>[]): IterableIterator<T> {
  let cursor = 0;
  let iter = intoIter(iterables[cursor]);

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = iter.next();

      while (chunk.done) {
        cursor++;

        if (iterables[cursor] == null) {
          return chunk;
        }

        iter = intoIter(iterables[cursor]);
        chunk = iter.next();
      }

      return chunk;
    },
  } as IterableIterator<T>;
}
