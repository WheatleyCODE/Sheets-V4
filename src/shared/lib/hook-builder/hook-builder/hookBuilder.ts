import { MutableRefObject, useRef } from 'react';
import { Cache } from '../../cache';
import type { ArrMergeValues, HookForBuilder, HookForBuilderData, HookForBuilderParams } from './hookBuilder.interface';
export class HookBuilder<RES extends HookForBuilderData[], ROOT extends HTMLElement> {
  #timeCaching: number | undefined;
  #cache: Cache<any> | undefined;
  #hooks: [HookForBuilder<ROOT>, HookForBuilderParams][] = [];

  addHook(hook: HookForBuilder<ROOT>, params?: HookForBuilderParams) {
    this.#hooks.push([hook, params]);
    return this;
  }

  enableMemo(cache: Cache<any>, timeMs?: number) {
    this.#timeCaching = timeMs;
    this.#cache = cache;
    return this;
  }

  build() {
    type Result = {
      ref: MutableRefObject<ROOT | null>;
      data: ArrMergeValues<RES, 'data'>;
      dataChangers: ArrMergeValues<RES, 'dataChangers'>;
      eventHandlers: ArrMergeValues<RES, 'eventHandlers'>;
    };

    return (hookParams?: any) => {
      const ref = useRef<ROOT | null>(null);

      let resData = {} as ArrMergeValues<RES, 'data'>;
      let resDataChangers = {} as ArrMergeValues<RES, 'dataChangers'>;
      let resEventHandlers = {} as ArrMergeValues<RES, 'eventHandlers'>;

      this.#hooks.forEach(([hook, params]) => {
        let currentParams = params;

        if (hookParams?.[hook.name]) {
          currentParams = hookParams[hook.name];
        }

        const { data, dataChangers, eventHandlers } = hook(ref, currentParams);

        resData = { ...resData, ...data };
        resDataChangers = { ...resDataChangers, ...dataChangers };
        resEventHandlers = { ...resEventHandlers, ...eventHandlers };
      });

      if (this.#cache) {
        return {
          ref,
          data: this.#cache.memo(resData, this.#timeCaching),
          dataChangers: this.#cache.memo(resDataChangers, this.#timeCaching),
          eventHandlers: this.#cache.memo(resEventHandlers, this.#timeCaching),
        } as Result;
      }

      return {
        ref,
        data: resData,
        dataChangers: resDataChangers,
        eventHandlers: resEventHandlers,
      } as Result;
    };
  }
}
