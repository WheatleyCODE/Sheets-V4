import { IDB_NAME, IDB_STORE_NAME } from '@/shared/consts';
import { Nullable } from '../../ts-utils';
import type { KVStorageEngine } from '../kv-storage/kvStorage.interface';
import type { DBMode } from './indexedDBEngine.interface';

export class IndexedDBAsyncEngine implements KVStorageEngine {
  #storeName: string;
  #db: Promise<IDBDatabase>;

  constructor({ dbName = IDB_NAME, storeName = IDB_STORE_NAME } = {}) {
    this.#storeName = storeName;

    const openRequest = indexedDB.open(dbName);

    this.#db = new Promise((r) => {
      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      openRequest.onsuccess = () => {
        r(openRequest.result);
      };
    });
  }

  async get<T>(key: string): Promise<Nullable<T>> {
    const store = await this.getStore('readonly');
    return promisifyRequestToStore<T>(store.get(key));
  }

  async set(key: string, value: string): Promise<void> {
    const store = await this.getStore('readwrite');
    await promisifyRequestToStore(store.put(value, key));
  }

  async remove(key: string): Promise<void> {
    const store = await this.getStore('readwrite');
    await promisifyRequestToStore(store.delete(key));
  }

  async keys(): Promise<IDBValidKey[]> {
    const store = await this.getStore('readonly');

    if (Object.isFunction(store.getAllKeys)) {
      return promisifyRequestToStore(store.getAllKeys());
    }

    return new Promise((resolve, reject) => {
      const request = store.openCursor();
      const keys: IDBValidKey[] = [];

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        const cursor = request.result;

        if (cursor) {
          keys.push(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve(keys);
        }
      };
    });
  }

  async clear(): Promise<void> {
    const store = await this.getStore('readwrite');
    return promisifyRequestToStore(store.clear());
  }

  async getStore(mode: DBMode): Promise<IDBObjectStore> {
    const db = await this.#db;
    return db.transaction(this.#storeName, mode).objectStore(this.#storeName);
  }
}

function promisifyRequestToStore<T>(request: IDBRequest): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
