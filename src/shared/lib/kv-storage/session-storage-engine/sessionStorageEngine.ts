import { Nullable } from '../../ts-utils';
import { SyncPromise } from '../../promise';
import type { KVStorageEngine } from '../kv-storage/kvStorage.interface';

export class SessionStorageEngine implements KVStorageEngine {
  get(key: string): SyncPromise<Nullable<string>> {
    return new SyncPromise((res) => {
      res(sessionStorage.getItem(key));
    });
  }

  set(key: string, value: string): SyncPromise<Nullable<void>> {
    return new SyncPromise((res) => {
      res(sessionStorage.setItem(key, value));
    });
  }

  remove(key: string): SyncPromise<Nullable<void>> {
    return new SyncPromise((res) => {
      res(sessionStorage.removeItem(key));
    });
  }
}
