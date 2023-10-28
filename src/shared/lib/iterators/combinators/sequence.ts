// ! FIX
export type AnyIterable<T = unknown> = Iterable<T> | AsyncIterable<T>;
export type IterableType<T extends Iterable<any> | AsyncIterable<any>> = T extends Iterable<infer V>
  ? V
  : T extends AsyncIterable<infer V>
  ? V
  : T;

export function sequence<T extends Iterable<any>>(...iterables: T[]): IterableIterator<IterableType<T>>;
export function sequence<T extends AsyncIterable<any>, A extends AnyIterable<any>>(
  iterable: T,
  ...iterables: A[]
): AsyncIterableIterator<IterableType<T> | IterableType<A>>;

export function sequence(...iterables: AnyIterable[]): IterableIterator<unknown> | AsyncIterableIterator<unknown> {
  let cursor = 0,
    iter;

  const isAsync = Object.isAsyncIterable(iterables[cursor]);

  if (isAsync) {
    return {
      [Symbol.asyncIterator]() {
        return this;
      },

      async next(): Promise<IteratorResult<unknown>> {
        if (cursor >= iterables.length) {
          return Promise.resolve({ value: undefined, done: true });
        }

        if (!Object.isTruly(iter)) {
          iter = getIter(iterables[cursor]);
        }

        let res: IteratorResult<unknown>;

        while (((res = await iter.next()), res.done) && ++cursor < iterables.length) {
          iter = getIter(iterables[cursor]);
        }

        return res;

        function getIter(obj: AnyIterable): AsyncIterableIterator<unknown> {
          let i;

          if (Object.isAsyncIterable(obj)) {
            i = obj[Symbol.asyncIterator]();
          } else {
            i = obj[Symbol.iterator]();
          }

          return Object.cast(i);
        }
      },
    };
  }

  return {
    [Symbol.iterator]() {
      return this;
    },

    next(): IteratorResult<unknown> {
      if (cursor >= iterables.length) {
        return { value: undefined, done: true };
      }

      if (!Object.isTruly(iter)) {
        iter = iterables[cursor][Symbol.iterator]();
      }

      let res: IteratorResult<unknown>;

      while (((res = iter.next()), res.done) && ++cursor < iterables.length) {
        iter = iterables[cursor][Symbol.iterator]();
      }

      return res;
    },
  };
}
