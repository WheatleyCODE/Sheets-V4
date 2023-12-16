import { MutableRefObject, useCallback, useState, useEffect, UIEvent } from 'react';
import type { IUseScrollParams, IUseScrollResult } from './useScroll.interface';
import { useInitialEffect } from '../../use-initial-effect/useInitialEffect';

export const useScroll = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseScrollParams<T> = {},
): IUseScrollResult<T> => {
  const { initScroll = 0, onChangeScroll, onScroll: onScrollHandler } = params;

  const [scroll, setScroll] = useState(0);

  useInitialEffect(() => {
    setScroll(initScroll);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.scrollTop !== scroll) {
      el.scrollTop = scroll;
    }
  }, [ref, scroll]);

  const addScroll = useCallback(
    (num: number) => {
      setScroll((p) => {
        onChangeScroll?.(p + num);
        return p + num;
      });
    },
    [onChangeScroll],
  );

  const changeScroll = useCallback(
    (num: number) => {
      setScroll(num);
      onChangeScroll?.(num);
    },
    [onChangeScroll],
  );

  const onScroll = useCallback(
    (e: UIEvent<T>) => {
      onScrollHandler?.(e);
    },
    [onScrollHandler],
  );

  return {
    data: {
      scroll,
    },

    dataChangers: {
      changeScroll,
      addScroll,
    },

    eventHandlers: {
      onScroll,
    },
  };
};
