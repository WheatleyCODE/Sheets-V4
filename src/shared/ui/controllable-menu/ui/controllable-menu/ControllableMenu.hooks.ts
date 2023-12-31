import { useCallback, useMemo, useState } from 'react';
import {
  IUseHoverParams,
  IUseKeydownParams,
  IUseKeydownResult,
  useKeydown,
} from '@/shared/lib/hooks/hooks-for-builder';
import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import type { IControllableMenuItem } from './ControllableMenu.interface';
import { useGlobalKeydown } from '@/shared/lib/hooks';

export type UseControllableMenuMergedTypes = [IUseKeydownResult];

const useKeydownParams: IUseKeydownParams = { onKeyDown: (e) => e.preventDefault() };

const useControllableMenuEvents = new HookBuilder<UseControllableMenuMergedTypes, HTMLDivElement>()
  .enableMemo(new Cache())
  .addHook(useKeydown, useKeydownParams)
  .build();

export type UseValidInputParams<T extends HTMLElement> = {
  useHover?: IUseHoverParams<T>;

  items?: IControllableMenuItem[];
  initActiveIndex?: number;
  onChangeIndex?: (item: IControllableMenuItem) => void;
};

export type useControllableMenuResult = ReturnType<typeof useControllableMenu>;

export type DepthState = { index: number; next?: DepthState };

export const useControllableMenu = (params: UseValidInputParams<HTMLDivElement> = {}) => {
  const { useHover, items = [], initActiveIndex = 0, onChangeIndex } = params;

  // const [activeIndex, setActiveIndex] = useState(initActiveIndex);
  // const [activeDepth, setActiveDepth] = useState(0);

  const [menuState, setMenuState] = useState<DepthState>({ index: initActiveIndex });

  // const state = { index: 4, next: { index: 1, next: { index: 0 } } };

  console.log(menuState);

  const changeMenuState = useCallback((index: number, depth: number) => {
    if (depth === 0) {
      setMenuState({ index });
    }

    if (depth === 1) {
      setMenuState((p) => {
        return { ...p, next: { index } };
      });
    }

    if (depth === 2) {
      setMenuState((p) => {
        if (!p.next) return { index };

        return { ...p, next: { ...p.next, next: { index } } };
      });
    }
  }, []);

  const addCurrentDepthIndex = useCallback(
    (num: number) => {
      if (menuState?.next?.next) {
        setMenuState((p) => {
          if (!p.next?.next) return { index: 0 };

          return { ...p, next: { ...p.next, next: { ...p.next.next, index: p.next.next.index + num } } };
        });

        return;
      }

      if (menuState?.next) {
        setMenuState((p) => {
          if (!p.next) return { index: 0 };

          return { ...p, next: { ...p.next, index: p.next.index + num } };
        });

        return;
      }

      setMenuState((p) => ({ ...p, index: p.index + num }));
    },
    [menuState],
  );

  // const addActiveIndex = useCallback(
  //   (num: number) => {
  //     setActiveIndex((p) => {
  //       if (p + num >= items.length - 1) {
  //         onChangeIndex?.(items[items.length - 1]);
  //         return items.length - 1;
  //       }

  //       if (p + num <= 0) {
  //         onChangeIndex?.(items[0]);
  //         return 0;
  //       }

  //       onChangeIndex?.(items[p + num]);
  //       return p + num;
  //     });
  //   },
  //   [items, onChangeIndex],
  // );

  // const changeActiveIndex = useCallback(
  //   (index: number) => {
  //     setActiveIndex(index);
  //     onChangeIndex?.(items[index]);
  //   },
  //   [items, onChangeIndex],
  // );

  const { data, dataChangers, eventHandlers, ref } = useControllableMenuEvents({
    useHover,
  });

  const arrowUpHandler = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      addCurrentDepthIndex(-1);
      console.log(ref.current?.scrollTop);
    },
    [addCurrentDepthIndex, ref],
  );
  const arrowDownHandler = useCallback(() => addCurrentDepthIndex(1), [addCurrentDepthIndex]);

  useGlobalKeydown({ ArrowUp: [arrowUpHandler], ArrowDown: [arrowDownHandler] });

  return {
    data: useMemo(() => ({ ...data, items, menuState }), [menuState, data, items]),
    dataChangers: useMemo(
      () => ({ ...dataChangers, changeMenuState, addCurrentDepthIndex }),
      [addCurrentDepthIndex, changeMenuState, dataChangers],
    ),
    eventHandlers,
    ref,
  };
};
