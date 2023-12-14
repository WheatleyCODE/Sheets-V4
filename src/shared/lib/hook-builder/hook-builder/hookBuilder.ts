import { MutableRefObject, useRef } from 'react';
import type { ArrMergeValues, HookForBuilder, HookForBuilderData, HookForBuilderParams } from './hookBuilder.interface';

export class HookBuilder<RES extends HookForBuilderData[], ROOT extends HTMLElement> {
  #hooks: [HookForBuilder<ROOT>, HookForBuilderParams][] = [];

  addHook(hook: HookForBuilder<ROOT>, ...params: HookForBuilderParams) {
    this.#hooks.push([hook, params]);
    return this;
  }

  build() {
    return () => {
      const ref = useRef<ROOT | null>(null);

      let resData = {};
      let resDataChangers = {};
      let resEventHandlers = {};

      this.#hooks.forEach(([hook, params]) => {
        const { data, dataChangers, eventHandlers } = hook(ref, ...params);

        resData = { ...resData, ...data };
        resDataChangers = { ...resDataChangers, ...dataChangers };
        resEventHandlers = { ...resEventHandlers, ...eventHandlers };
      });

      return {
        ref,
        data: resData,
        dataChangers: resDataChangers,
        eventHandlers: resEventHandlers,
      } as {
        ref: MutableRefObject<ROOT | null>;
        data: ArrMergeValues<RES, 'data'>;
        dataChangers: ArrMergeValues<RES, 'dataChangers'>;
        eventHandlers: ArrMergeValues<RES, 'eventHandlers'>;
      };
    };
  }
}
