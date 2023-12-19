import { Node } from '../../data-structure';
import { BaseList } from '../../data-structure/base-list/baseList';
import { hashFunction } from '../../hash';
import type { CacheValue } from './cache.interface';

export class Cache<T extends SerializableValue> {
  #cache: { [key: string]: CacheValue<T> } = {};
  #maxItems: number;
  #keys = new BaseList<string>();

  constructor(maxItems: number = 20) {
    this.#maxItems = maxItems;
  }

  hashMemo(value: T, expiresInMs: number = Infinity): T {
    const keyHash = hashFunction(value);
    const existValue = this.get(keyHash);

    if (existValue !== undefined) return existValue;

    return this.set(keyHash, value, expiresInMs);
  }

  memo(value: T, expiresInMs: number = Infinity) {
    const keyHash = hashFunction(value);
    const existValue = this.get(keyHash);

    if (existValue !== undefined) {
      if (!Object.isPrimitive(value) && !Object.isPrimitive(existValue)) {
        const values1 = Object.values(value);
        const values2 = Object.values(existValue);

        if (values1.length !== values2.length) {
          return this.set(keyHash, value, expiresInMs);
        }

        for (let i = 0; i < values1.length; i++) {
          if (values1[i] !== values2[i]) {
            return this.set(keyHash, value, expiresInMs);
          }
        }
      }

      return existValue;
    }

    return this.set(keyHash, value, expiresInMs);
  }

  set(key: string, value: T, expiresInMs: number = Infinity): T {
    const expiresAt = Date.now() + expiresInMs;

    if (this.#keys.length >= this.#maxItems) {
      this.unshift();
    }

    const cacheValue = new Array(2) as CacheValue<T>;
    cacheValue[0] = value;
    cacheValue[1] = expiresAt;

    this.#keys.push(key);
    this.#cache[key] = cacheValue;

    return value;
  }

  get(key: string): T | undefined {
    if (this.#cache[key] !== undefined) {
      const [value, expiresAt] = this.#cache[key];

      if (expiresAt > Date.now()) {
        return value;
      }

      this.remove(key);
    }
  }

  has(key: string): boolean {
    return Boolean(this.get(key));
  }

  remove(key: string): void {
    return this.#deleteCacheProp(this.#keys.remove(key));
  }

  unshift() {
    return this.#deleteCacheProp(this.#keys.unshift());
  }

  pop(): void {
    return this.#deleteCacheProp(this.#keys.pop());
  }

  #deleteCacheProp(node: Node<string> | undefined): void {
    if (node) {
      delete this.#cache[node[0]];
    }
  }

  clear(): void {
    this.#cache = {};
    this.#keys = new BaseList<string>();
  }

  get length() {
    return this.#keys.length;
  }
}
