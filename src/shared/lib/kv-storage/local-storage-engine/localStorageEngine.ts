import { Nullable } from 'shared/lib/ts-utils/utils/tsUtils';
import { KVStorageEngine } from '../interface';
import { SyncPromise } from 'shared/lib/promise';

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
