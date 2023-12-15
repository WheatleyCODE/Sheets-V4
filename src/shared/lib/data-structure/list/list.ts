import { BaseList } from '../base-list/baseList';
import type { ForEachCallback, MapCallback } from './list.interface';

export class List<T> extends BaseList<T> {
  forEach(callback: ForEachCallback<T>): List<T> {
    let node = this.first;

    while (node) {
      callback(node[0]);
      node = node[1];
    }

    return this;
  }

  map<R>(callback: MapCallback<T, R>): List<R> {
    let node = this.first;
    const list = new List<R>();

    while (node) {
      list.push(callback(node[0]));
      node = node[1];
    }

    return list;
  }

  toArray(): T[] {
    const arr = new Array(this.length);
    let node = this.first;
    let cursor = 0;

    while (node) {
      arr[cursor] = node[0];
      node = node[1];
      cursor++;
    }

    return arr;
  }
}
