import { ForEachCallback, IterReturnObjectType, MapCallback, Predicate } from '../types/interface';
import { intoIterator } from '../into-iterator/intoIterator';

export function intoIter<T>(obj: any, type?: IterReturnObjectType): Iter<T> {
  if (obj[Symbol.iterator] != null) {
    return new Iter(obj[Symbol.iterator]());
  }

  return new Iter(intoIterator(obj, type));
}

export class Iter<T> {
  iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  filter(pred: Predicate<T>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        if (pred(el)) {
          yield el;
        }
      }
    })();

    return new Iter(newIterable);
  }

  map<N>(fn: MapCallback<T, N>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        yield fn(el);
      }
    })();

    return new Iter(newIterable);
  }

  forEach(fn: ForEachCallback<T>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        fn(el);
        yield el;
      }
    })();

    return new Iter(newIterable);
  }

  take(num: number) {
    const { iterable } = this;

    const newIterable = (function* () {
      if (num <= 0) return;

      for (const el of iterable) {
        if (num <= 0) return;

        num--;
        yield el;
      }
    })();

    return new Iter(newIterable);
  }

  enumerate(): Iter<[T, number]> {
    const { iterable } = this;

    const newIterable: Generator<[T, number]> = (function* () {
      let i = 0;

      for (const el of iterable) {
        yield [el, i];
        i++;
      }
    })();

    return new Iter(newIterable);
  }

  toArray() {
    return [...this.iterable];
  }
}
