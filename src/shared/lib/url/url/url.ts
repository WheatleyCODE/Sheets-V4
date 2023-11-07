import { OptionalRecord } from '../../ts-utils';
import { SerializablePrimitiveValue } from '../../kv-storage';

// export const getQueryParams = (params: OptionalRecord<string, string>) => {
//   const searchParams = new URLSearchParams(window.location.search);

//   for (const [name, value] of Object.entries(params)) {
//     if (value) {
//       searchParams.set(name, value);
//     }
//   }

//   return `?${searchParams.toString()}`;
// };

// export const addQueryParams = (params: OptionalRecord<string, string>) => {
//   window.history.pushState(null, '', getQueryParams(params));
// };

// export const addParam = (path: string, param: string, value: unknown) => {
//   return `${path}?${param}=${JSON.stringify(value)}`;
// };

export class URLHelper {
  #url: URL;
  #state: string[] = [];

  constructor(url?: string) {
    this.#url = new URL(url || window.location.origin);
  }

  getParam(name: string): string | null {
    return this.#url.searchParams.get(name);
  }

  addHash(hash: string) {
    this.#url.hash = hash;
    return this;
  }

  setParams(params: OptionalRecord<string, SerializablePrimitiveValue>, isPushHistory = false): URLHelper {
    for (const [name, value] of Object.entries(params)) {
      if (value) {
        this.#url.searchParams.set(name, JSON.stringify(value));
      }
    }

    if (isPushHistory) {
      window.history.pushState(null, '', this.#url.toString());
    }

    this.#saveChanges();
    return this;
  }

  removeParam(name: string): URLHelper {
    this.#url.searchParams.delete(name);
    this.#saveChanges();
    return this;
  }

  findParam(param: string): boolean {
    return this.#url.searchParams.has(param);
  }

  joinPaths(...paths: string[]): URLHelper {
    const joinedPath = paths.map((path) => path.trim()).join('/');
    this.#url.pathname = joinedPath;
    this.#saveChanges();
    return this;
  }

  #saveChanges(): void {
    const newURL = this.#url.toString();
    this.#state.push(newURL);
  }

  toFullURL(): string {
    return this.#url.toString();
  }

  toPath(): string {
    return this.#url.href.split(window.location.origin)[1];
  }

  getState(): string[] {
    return this.#state;
  }
}
