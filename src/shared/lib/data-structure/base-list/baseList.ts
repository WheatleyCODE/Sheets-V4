import type { Node } from './baseList.interface';

const createNode = <T>(value: T, next?: Node<T>): Node<T> => {
  const node = new Array(2);

  node[0] = value;
  node[1] = next;

  return node as Node<T>;
};

export class BaseList<T> {
  first?: Node<T>;
  last?: Node<T>;
  length = 0;

  constructor(values?: Iterable<T>) {
    if (values) {
      for (const value of values) {
        this.push(value);
      }
    }
  }

  *[Symbol.iterator]() {
    let node = this.first;

    while (node) {
      yield node[0];
      node = node[1];
    }
  }

  push(value: T): Node<T> {
    const node = createNode(value);

    if (this.last) {
      this.last[1] = node;
    }

    if (!this.first) {
      this.first = node;
    }

    this.length++;
    this.last = node;

    return node;
  }

  shift(value: T): Node<T> {
    const node = createNode(value, this.first);

    if (!this.last) {
      this.last = node;
    }

    this.length++;
    this.first = node;

    return node;
  }

  remove(value: T): Node<T> | undefined {
    const { prevNode, node: delNode } = this.#findNodeAndBeforeByValue(value);

    if (!prevNode && !delNode) return;

    this.length--;

    if (!prevNode && delNode) {
      this.first = delNode[1];
    }

    if (this.last === delNode && !prevNode) {
      this.last = undefined;
      return delNode;
    }

    if (this.last === delNode && prevNode) {
      prevNode[1] = undefined;
      this.last = prevNode;
      return delNode;
    }

    if (prevNode && delNode) {
      prevNode[1] = delNode[1];
    }

    return delNode;
  }

  pop(): Node<T> | undefined {
    if (!this.last) return;
    const { prevNode, node: delNode } = this.#findNodeAndBeforeByNode(this.last);

    if (prevNode && delNode) {
      prevNode[1] = undefined;
      this.last = prevNode;
      this.length--;
    }

    if (!prevNode && delNode) {
      this.length--;
      this.last = undefined;
      this.first = undefined;
    }

    return delNode;
  }

  unshift(): Node<T> | undefined {
    if (!this.first) return;

    const delNode = this.first;

    this.first = this.first[1];
    this.length--;

    return delNode;
  }

  findValueByIndex(index: number): T | undefined {
    let node = this.first;

    while (node && node[0] && index > 0) {
      node = node[1];
      index--;
    }

    if (index !== 0) return;

    return node?.[0];
  }

  findNodeByIndex(index: number): Node<T> | undefined {
    let node = this.first;

    while (node && node[0] && index > 0) {
      node = node[1];
      index--;
    }

    if (index !== 0) return;

    return node;
  }

  findNodeByValue(value: T): Node<T> | undefined {
    if (!this.first) return;
    let node: Node<T> | undefined = this.first;

    while (node) {
      if (value === node[0]) return node;
      node = node[1];
    }

    return;
  }

  #findNodeAndBeforeByValue = (value: T): { prevNode?: Node<T>; node?: Node<T> } => {
    let node = this.first;
    let prevNode = undefined;

    while (node && node[0] !== value) {
      prevNode = node;
      node = node[1];
    }

    return { prevNode, node };
  };

  #findNodeAndBeforeByNode = (findNode: Node<T>): { prevNode?: Node<T>; node?: Node<T> } => {
    let node = this.first;
    let prevNode = undefined;

    while (node && node !== findNode) {
      prevNode = node;
      node = node[1];
    }

    return { prevNode, node };
  };

  addAfterValue(afterValue: T, value: T): Node<T> | undefined {
    const nodeAfter = this.findNodeByValue(afterValue);
    if (!nodeAfter) return;
    return this.addAfterNode(nodeAfter, value);
  }

  addAfterNode(nodeAfter: Node<T>, value: T): Node<T> | undefined {
    const node = createNode(value, nodeAfter[1]);
    nodeAfter[1] = node;
    this.length++;

    return node;
  }

  addBeforeValue(beforeValue: T, value: T): Node<T> | undefined {
    const { prevNode, node: beforeNode } = this.#findNodeAndBeforeByValue(beforeValue);
    if (!prevNode || !beforeNode) return;

    return this.addBeforeNode(prevNode, beforeNode, value);
  }

  addBeforeNode(prevNode: Node<T>, beforeNode: Node<T>, value: T): Node<T> | undefined {
    if (!prevNode || !beforeNode) return;

    const node = createNode(value, beforeNode);
    prevNode[1] = node;
    this.length++;

    return node;
  }
}
