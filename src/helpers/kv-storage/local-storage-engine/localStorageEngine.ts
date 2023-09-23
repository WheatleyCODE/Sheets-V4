import { CanPromise, Nullable } from "../../ts-utils/tsUtils";
import { KVStorageEngine } from "../interface";

export class LocalStorageEngine implements KVStorageEngine {
  get(key: string): CanPromise<Nullable<string>> {
    return localStorage.getItem(key);
  }

  set(key: string, value: string): CanPromise<void> {
    return localStorage.setItem(key, value);
  }

  remove(key: string): CanPromise<void> {
    return localStorage.removeItem(key);
  }
}
