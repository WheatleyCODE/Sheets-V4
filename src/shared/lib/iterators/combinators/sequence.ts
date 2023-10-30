export type AnyIterable<T = unknown> = Iterable<T> | AsyncIterable<T>;

export const sequence = (...iterables: AnyIterable[]) => {
  return {
    *[Symbol.iterator]() {
      for (const iterable of iterables) {
        if (Object.isIterable(iterable)) {
          yield* iterable;
        } else {
          yield iterable;
        }
      }
    },
  };
};

export const asyncSequence = (...iterables: AnyIterable[]) => {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const iterable of iterables) {
        if (Object.isIterable(iterable)) {
          yield* iterable;
        } else {
          yield iterable;
        }
      }
    },
  };
};
