import { intoIter } from '../into-iter/intoIter';

export function intoBufferIter<T>(iterable: Iterable<T>, buffer: T[]): IterableIterator<T> {
  const sourceIter = intoIter(iterable);

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const chunk = sourceIter.next();

      if (!chunk.done) {
        buffer.push(chunk.value);
      }

      return chunk;
    },
  };
}
