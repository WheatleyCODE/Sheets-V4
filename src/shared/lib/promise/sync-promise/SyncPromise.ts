import { Nullable } from '../../ts-utils';

import type {
  ConstrRejectHandler,
  ConstrResolveHandler,
  Executor,
  PromiseState,
  RejectHandler,
  ResolveHandler,
  Value,
} from './SyncPromise.interface';

const loopback = () => {
  return undefined;
};
export class SyncPromise<T> implements Promise<T> {
  #state: PromiseState = 'pending';
  #fulfillHandlers: ConstrResolveHandler<T>[] = [];
  #rejectHandlers: ConstrRejectHandler[] = [];
  #value: any;
  [Symbol.toStringTag] = 'SyncPromise';

  constructor(executor: Executor<T>) {
    const clear = () => {
      this.#fulfillHandlers = [];
      this.#rejectHandlers = [];
    };

    const reject = (err: any) => {
      if (!this.isPending) {
        return;
      }

      this.#value = err;
      this.#state = 'rejected';

      for (let o = this.#rejectHandlers, i = 0; i < o.length; i++) {
        o[i](err);
      }

      if (__PROJECT__ === 'app') {
        queueMicrotask(() => {
          if (this.#rejectHandlers.length === 0) {
            void Promise.reject(err);
          }

          clear();
        });
      }
    };

    const resolve = (val: T) => {
      if (!this.isPending || this.#value != null) {
        return;
      }

      this.#value = val;

      if (Object.isPromiseLike(val)) {
        val.then(forceResolve, reject);
        return;
      }

      this.#state = 'fulfilled';

      for (let o = this.#fulfillHandlers, i = 0; i < o.length; i++) {
        o[i](val);
      }

      clear();
    };

    const forceResolve = (val: any) => {
      this.#value = undefined;
      resolve(val);
    };

    this.call(executor, [resolve, reject], reject);
  }

  get isPending() {
    return this.#state === 'pending';
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: Nullable<(value: T) => TResult1 | PromiseLike<TResult1>>,
    onRejected?: Nullable<(reason: any) => TResult2 | PromiseLike<TResult2>>,
  ): Promise<TResult1 | TResult2>;
  then(onFulfilled?: Nullable<ResolveHandler<T>>, onRejected?: Nullable<RejectHandler<T>>): SyncPromise<T> {
    return new SyncPromise<T>((resolve, reject) => {
      const fulfillWrapper = (val?: Value) => {
        this.call(onFulfilled ?? resolve, [val], reject, resolve);
      };

      const rejectWrapper = (err: any) => {
        this.call(onRejected ?? reject, [err], reject, resolve);
      };

      this.#fulfillHandlers.push(fulfillWrapper);
      this.#rejectHandlers.push(rejectWrapper);

      if (!this.isPending) {
        (this.#state === 'fulfilled' ? fulfillWrapper : rejectWrapper)(this.#value);
      }
    });
  }

  catch<R>(onRejected: RejectHandler<R>): SyncPromise<R>;
  catch(onRejected?: Nullable<RejectHandler<T>>): SyncPromise<T>;
  catch(onRejected?: Nullable<RejectHandler<T>>): SyncPromise<T> {
    return new SyncPromise((resolve, reject) => {
      const rejectWrapper = (err: any) => {
        this.call(onRejected ?? reject, [err], reject, resolve);
      };

      this.#fulfillHandlers.push(resolve);
      this.#rejectHandlers.push(rejectWrapper);

      if (!this.isPending) {
        (this.#state === 'fulfilled' ? resolve : rejectWrapper)(this.#value);
      }
    });
  }

  finally(cb?: Nullable<Function>): SyncPromise<T> {
    return new SyncPromise((resolve, reject) => {
      const fulfillWrapper = () => {
        try {
          let res = cb?.();

          if (Object.isPromiseLike(res)) {
            res = res.then(() => this.#value);
          } else {
            res = this.#value;
          }

          resolve(res);
        } catch (err) {
          reject(err);
        }
      };

      const rejectWrapper = () => {
        try {
          let res = cb?.();

          if (Object.isPromiseLike(res)) {
            res = res.then(() => this.#value);
            resolve(res);
          } else {
            reject(this.#value);
          }
        } catch (err) {
          reject(err);
        }
      };

      this.#fulfillHandlers.push(fulfillWrapper);
      this.#rejectHandlers.push(rejectWrapper);

      if (!this.isPending) {
        (this.#state === 'fulfilled' ? fulfillWrapper : rejectWrapper)();
      }
    });
  }

  call<A = unknown, V = unknown>(
    fn: Nullable<Function>,
    args?: A[],
    onError?: ConstrRejectHandler,
    onValue?: AnyOneArgFunction<V>,
  ): void {
    const reject = onError ?? loopback;
    const resolve = onValue ?? loopback;

    try {
      if (fn && typeof fn !== 'function') {
        resolve(this.#value);
      }

      const res = fn && args ? fn(...args) : fn?.();

      if (Object.isPromiseLike(res)) {
        res.then(resolve as any, reject);
      } else {
        resolve(res);
      }
    } catch (err) {
      reject(err);
    }
  }

  unwrap(): T {
    if (this.#state !== 'fulfilled') {
      if (this.isPending) {
        throw new Error('Нельзя раскрыть не завершенный SyncPromise');
      }

      if (this.#rejectHandlers.length === 0) {
        this.#rejectHandlers.push(() => {});
      }

      throw this.#value;
    }

    return this.#value;
  }

  static resolve<T = unknown>(value?: Value<T>): SyncPromise<T> {
    if (value instanceof SyncPromise) {
      return value;
    }

    return new SyncPromise((resolve) => resolve(value));
  }

  static reject<T = never>(reason?: unknown): SyncPromise<T> {
    return new SyncPromise((_, reject) => reject(reason));
  }

  static all<T extends any[] | []>(
    values: T,
  ): SyncPromise<{
    [K in keyof T]: Awaited<T[K]>;
  }>;
  static all<T extends Iterable<Value>>(
    values: T,
  ): SyncPromise<Array<T extends Iterable<Value<infer V>> ? V : unknown>> {
    return new SyncPromise((resolve, reject) => {
      const promises = [];

      for (const el of values) {
        promises.push(SyncPromise.resolve(el));
      }

      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results = new Array(promises.length);
      let done = 0;

      for (let i = 0; i < promises.length; i++) {
        const onFulfilled = (val: any) => {
          done++;
          results[i] = val;

          if (done === promises.length) {
            resolve(results);
          }
        };

        promises[i].then(onFulfilled, reject);
      }
    });
  }

  static allSettled<T extends any[] | []>(
    values: T,
  ): SyncPromise<{
    [K in keyof T]: PromiseSettledResult<Awaited<T[K]>>;
  }>;
  static allSettled<T extends Iterable<Value>>(
    values: T,
  ): SyncPromise<Array<T extends Iterable<Value<infer V>> ? PromiseSettledResult<V> : PromiseSettledResult<unknown>>> {
    return new SyncPromise((resolve) => {
      const promises = [];

      for (const el of values) {
        promises.push(SyncPromise.resolve(el));
      }

      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results = new Array(promises.length);
      let done = 0;

      for (let i = 0; i < promises.length; i++) {
        const onFulfilled = (value: any) => {
          done++;

          results[i] = {
            status: 'fulfilled',
            value,
          };

          if (done === promises.length) {
            resolve(results);
          }
        };

        const onRejected = (reason: any) => {
          done++;

          results[i] = {
            status: 'rejected',
            reason,
          };

          if (done === promises.length) {
            resolve(results);
          }
        };

        promises[i].then(onFulfilled, onRejected);
      }
    });
  }

  static race<T extends Iterable<Value>>(values: T): SyncPromise<T extends Iterable<Value<infer V>> ? V : unknown> {
    return new SyncPromise((resolve, reject) => {
      const promises: SyncPromise<any>[] = [];

      for (const el of values) {
        promises.push(SyncPromise.resolve(el));
      }

      if (promises.length === 0) {
        resolve();
        return;
      }

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }

  static any<T extends Iterable<Value>>(values: T): SyncPromise<T extends Iterable<Value<infer V>> ? V : unknown> {
    return new SyncPromise((resolve, reject) => {
      const promises: SyncPromise<any>[] = [];

      for (const el of values) {
        promises.push(SyncPromise.resolve(el));
      }

      if (promises.length === 0) {
        resolve();
        return;
      }

      const errors: any[] = [];

      const onReject = (err: any) => {
        errors.push(err);

        if (errors.length === promises.length) {
          reject(new Error(`Не один SyncPromise не был выполнен успешно: ${JSON.stringify(errors)}`));
        }
      };

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, onReject);
      }
    });
  }
}
