import { Location } from 'react-router-dom';
import { OptionalRecord } from '../../ts-utils';
import { SerializablePrimitiveValue } from '../../kv-storage';
import { concatURLs } from '../concat-urls/concatUrls';

export class LocationHelper<T = any> {
  #location: Location<T>;
  #searchParams: URLSearchParams;

  constructor(location: Location<T>) {
    this.#location = JSON.parse(JSON.stringify(location));
    this.#searchParams = new URLSearchParams(location.search);
  }

  getLocation(): Location<T> {
    return this.#location;
  }

  get hash(): string {
    return this.#location.hash;
  }

  get key(): string {
    return this.#location.key;
  }

  get pathname(): string {
    return this.#location.pathname;
  }

  get search(): string {
    return this.#location.search;
  }

  get state(): T {
    return this.#location.state;
  }

  joinPaths(...paths: string[]): LocationHelper {
    this.#location.pathname = concatURLs(...paths);
    return this;
  }

  getParam(name: string): string | null {
    return this.#searchParams.get(name);
  }

  addHash(hash: string) {
    hash.startsWith('#') ? (this.#location.hash = hash) : (this.#location.hash = `#${hash}`);
    return this;
  }

  addParams(params: OptionalRecord<string, SerializablePrimitiveValue>, isSaveHistory = false): LocationHelper {
    for (const [name, value] of Object.entries(params)) {
      if (value) {
        this.#searchParams.set(name, JSON.stringify(value));
      }
    }

    this.#location.search = `?${this.#searchParams.toString()}`;
    if (isSaveHistory) this.#saveHistory();

    return this;
  }

  #saveHistory() {
    window.history.pushState(null, '', this.#location.search);
  }

  setParams(params: OptionalRecord<string, SerializablePrimitiveValue>, isSaveHistory = false): LocationHelper {
    this.#searchParams = new URLSearchParams();
    this.addParams(params, isSaveHistory);

    return this;
  }

  hasParam(param: string): boolean {
    return this.#searchParams.has(param);
  }

  getPath(): string {
    return `${this.pathname}${this.search}${this.hash}`;
  }

  deleteParams(names: Iterable<string>, isSaveHistory = false): LocationHelper {
    for (const name of names) {
      this.#searchParams.delete(name);
    }

    this.#location.search = `?${this.#searchParams.toString()}`;
    if (isSaveHistory) this.#saveHistory();

    return this;
  }
}
