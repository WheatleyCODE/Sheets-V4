import { ForEachCallback, MapCallback, Predicate } from '../types/interface';
import { intoAsyncIterator } from '../into-async-iterator/IntoAsyncIterator';

export function intoAsyncIter<T>(obj: any): AsyncIter<T> {
  if (obj[Symbol.asyncIterator] != null) {
    return new AsyncIter(obj[Symbol.asyncIterator]());
  }

  return new AsyncIter(intoAsyncIterator(obj));
}

export class AsyncIter<T> {
  #subscribers: ((a: T) => void)[] = [];
  iterable: AsyncIterable<T>;

  constructor(iterable: AsyncIterable<T>) {
    this.iterable = iterable;
  }

  async *[Symbol.asyncIterator]() {
    for await (const el of this.iterable) {
      this.#emit(el);
      yield el;
    }
  }

  subscribe(callback: (a: T) => void): () => void {
    this.#subscribers.push(callback);

    return () => {
      this.#subscribers = this.#subscribers.filter((fn) => fn !== callback);
    };
  }

  async run(iter: AsyncIter<T>, callback?: (a: T) => void) {
    for await (const data of iter) {
      callback?.(data);
    }
  }

  #emit(el: T) {
    this.#subscribers.forEach((cb) => cb(el));
  }

  filter(pred: Predicate<T>) {
    const { iterable } = this;

    const newIterable = (async function* () {
      for await (const el of iterable) {
        if (pred(el)) {
          yield el;
        }
      }
    })();

    return new AsyncIter(newIterable);
  }

  map<N>(fn: MapCallback<T, N>) {
    const { iterable } = this;

    const newIterable = (async function* () {
      for await (const el of iterable) {
        yield fn(el);
      }
    })();

    return new AsyncIter(newIterable);
  }

  forEach(fn: ForEachCallback<T>) {
    const { iterable } = this;

    const newIterable = (async function* () {
      for await (const el of iterable) {
        fn(el);
        yield el;
      }
    })();

    return new AsyncIter(newIterable);
  }

  take(num: number) {
    const { iterable } = this;

    const newIterable = (async function* () {
      if (num <= 0) return;

      for await (const el of iterable) {
        if (num <= 0) return;

        num--;
        yield el;
      }
    })();

    return new AsyncIter(newIterable);
  }

  enumerate(): AsyncIter<[Awaited<T>, number]> {
    const { iterable } = this;

    const newIterable: AsyncGenerator<[Awaited<T>, number]> = (async function* () {
      let i = 0;

      for await (const el of iterable) {
        yield [el, i];
        i++;
      }
    })();

    return new AsyncIter(newIterable);
  }
}
