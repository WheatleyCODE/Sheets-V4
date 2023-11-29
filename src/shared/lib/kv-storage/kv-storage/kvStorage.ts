import { LocalStorageEngine } from '../local-storage-engine/localStorageEngine';
import { Nullable, SyncOrAsyncPromise } from '../../ts-utils';
import type { SerializableValue, KVStorageEngine } from './kvStorage.interface';

export function KVFactory(namespace: string, engine?: KVStorageEngine) {
  const eng = engine || new LocalStorageEngine();
  return new KVStorage(namespace, eng);
}

export class KVStorage {
  readonly namespace: string;
  readonly engine: KVStorageEngine;

  constructor(namespace: string, engine: KVStorageEngine) {
    this.namespace = namespace;
    this.engine = engine;
  }

  get<T extends SerializableValue>(key: string): SyncOrAsyncPromise<Nullable<T>> {
    return this.engine.get(this.#getKey(key)).then((string) => JSON.parse(string ?? 'null'));
  }

  set(key: string, value: SerializableValue): SyncOrAsyncPromise<Nullable<void>> {
    const newValue = typeof value === 'string' ? value : JSON.stringify(value);

    return this.engine.set(this.#getKey(key), newValue);
  }

  remove(key: string): SyncOrAsyncPromise<Nullable<void>> {
    return this.engine.remove(this.#getKey(key));
  }

  #getKey(key: string) {
    return `[[${this.namespace}-${key}]]`;
  }
}
