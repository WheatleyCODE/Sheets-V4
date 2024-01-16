import { LocalStorageSyncEngine } from '../local-storage-sync-engine/localStorageEngine';
import { Nullable, SyncOrAsyncPromise } from '../../ts-utils';
import { STORAGE_NAMESPACE } from '@/shared/consts';
import type { IKVStorageEngine } from './kvStorage.interface';

export function KVFactory(namespace = STORAGE_NAMESPACE, engine: IKVStorageEngine = new LocalStorageSyncEngine()) {
  return new KVStorage(namespace, engine);
}

export class KVStorage {
  readonly namespace: string;
  readonly engine: IKVStorageEngine;

  constructor(namespace: string, engine: IKVStorageEngine) {
    this.namespace = namespace;
    this.engine = engine;
  }

  get<T extends SerializableValue>(key: string): SyncOrAsyncPromise<Nullable<T>> {
    return this.engine
      .get(this.#getKey(key))
      .then((string) => JSON.parse(string ?? 'null'))
      .catch((e) => console.error('KVStorage: При парсинге данных из хранилища произошла ошибка', e));
  }

  set(key: string, value: SerializableValue): SyncOrAsyncPromise<Nullable<void>> {
    return this.engine
      .set(this.#getKey(key), JSON.stringify(value))
      .catch((e) => console.error('KVStorage: При парсинге данных в хранилище произошла ошибка', e));
  }

  remove(key: string): SyncOrAsyncPromise<Nullable<void>> {
    return this.engine.remove(this.#getKey(key));
  }

  #getKey(key: string) {
    return `[[${this.namespace}-${key}]]`;
  }
}
