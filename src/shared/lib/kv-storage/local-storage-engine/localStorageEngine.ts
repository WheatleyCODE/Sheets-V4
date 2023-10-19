import { Nullable } from '../../ts-utils';
import { KVStorageEngine } from '../interface';
import { SyncPromise } from '../../promise';

export class LocalStorageEngine implements KVStorageEngine {
  get(key: string): SyncPromise<Nullable<string>> {
    return new SyncPromise((res) => {
      res(localStorage.getItem(key));
    });
  }

  set(key: string, value: string): SyncPromise<Nullable<void>> {
    return new SyncPromise((res) => {
      res(localStorage.setItem(key, value));
    });
  }

  remove(key: string): SyncPromise<Nullable<void>> {
    return new SyncPromise((res) => {
      res(localStorage.removeItem(key));
    });
  }
}
