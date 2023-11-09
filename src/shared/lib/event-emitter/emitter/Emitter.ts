import type { IEmitterData, IEmitterSubs } from './Emitter.interface';

export abstract class Emitter<D extends IEmitterData, N extends string> {
  #subscribers: IEmitterSubs<D> = {};
  private static instance: Emitter<any, any>;

  constructor() {
    if (Emitter.instance) return Emitter.instance;
    Emitter.instance = this;
  }

  subscribe(id: string, eventName: N, callback: (a: D) => void): () => void {
    if (!this.#subscribers[id]) this.#subscribers[id] = {};
    if (!this.#subscribers[id][eventName]) this.#subscribers[id][eventName] = [];

    this.#subscribers[id][eventName].push(callback);

    return () => {
      this.#subscribers[id][eventName] = this.#subscribers[id][eventName].filter((fn) => fn !== callback);
    };
  }

  emit(data: D): void {
    try {
      const { id, eventName } = data;
      this.#subscribers[id][eventName].forEach((callback) => callback(data));
    } catch (e) {
      if (__PROJECT__ === 'jest') return;
      console.warn('Вы не подписаны на данное событие', data);
    }
  }
}
