import { Nullable } from '../../ts-utils';
import type { PromiseState } from './SyncPromise.interface';
export class SyncPromise<T> implements Promise<T> {
  #value?: T;
  #reason?: any;
  #state: PromiseState = 'pending';
  [Symbol.toStringTag] = 'SyncPromise';

  constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value?: T) {
    if (this.#state === 'pending') {
      this.#state = 'fulfilled';
      this.#value = value;
    }
  }

  #reject(reason?: any) {
    if (this.#state === 'pending') {
      this.#state = 'rejected';
      this.#reason = reason;
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: Nullable<(value: T) => TResult1 | PromiseLike<TResult1>>,
    onRejected?: Nullable<(reason: any) => TResult2 | PromiseLike<TResult2>>,
  ): Promise<TResult1 | TResult2> {
    return new SyncPromise<TResult1 | TResult2>((resolve, reject) => {
      if (this.#state === 'fulfilled' && onFulfilled) {
        try {
          const result = onFulfilled(this.#value as T);
          resolve(result as any);
        } catch (error) {
          reject(error);
        }
      } else if (this.#state === 'rejected' && onRejected) {
        try {
          const result = onRejected(this.#reason);
          resolve(result as any);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve();
      }
    });
  }

  catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined,
  ): Promise<T | TResult> {
    return this.then(undefined, onRejected);
  }

  finally(onFinally: () => void): Promise<T> {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (reason) => {
        onFinally();
        throw reason;
      },
    );
  }

  static resolve<T>(value?: T): Promise<T> {
    const promise = new SyncPromise<T>((resolve) => resolve(value));
    return promise;
  }

  static reject<T = never>(reason?: any): Promise<T> {
    const promise = new SyncPromise<T>((_, reject) => reject(reason));
    return promise;
  }
}
