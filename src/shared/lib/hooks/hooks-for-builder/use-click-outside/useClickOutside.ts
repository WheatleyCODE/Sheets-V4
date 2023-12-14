import { MutableRefObject, useEffect } from 'react';
import type { IUseClickOutsideParams, IUseClickOutsideResult } from './useClickOutside.interface';

export const useClickOutside = <T extends HTMLElement, O extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseClickOutsideParams<O> = {},
): IUseClickOutsideResult => {
  const { handler, refOut, isClick = true, isContextmenu = true } = params;

  useEffect(() => {
    const fn = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler?.(event);
    };

    if (refOut) {
      const outEl = refOut.current;

      if (!outEl) return;

      if (isClick) outEl.addEventListener('click', fn);
      if (isContextmenu) outEl.addEventListener('contextmenu', fn);

      return () => {
        if (isClick) outEl.removeEventListener('click', fn);
        if (isContextmenu) outEl.removeEventListener('contextmenu', fn);
      };
    }

    if (isClick) document.body.addEventListener('click', fn);
    if (isContextmenu) document.body.addEventListener('contextmenu', fn);

    return () => {
      if (isClick) document.body.addEventListener('click', fn);
      if (isContextmenu) document.body.addEventListener('contextmenu', fn);
    };
  }, [handler, isClick, isContextmenu, ref, refOut]);

  return {
    data: {},

    dataChangers: {},

    eventHandlers: {},
  };
};
