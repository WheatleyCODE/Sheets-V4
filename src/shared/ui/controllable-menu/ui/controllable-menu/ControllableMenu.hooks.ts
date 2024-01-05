import { useCallback, useMemo, useState } from 'react';
import {
  IUseHoverParams,
  IUseKeydownParams,
  IUseKeydownResult,
  useClickOutside,
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
  .addHook(useClickOutside)
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

  console.log(menuState, 'menustate');

  const changeMenuState = useCallback(
    (index: number, depth: number) => {
      if (depth === 0) {
        setMenuState({ index });
      }

      if (depth === 1) {
        setMenuState((p) => {
          if (items?.[p.index]?.childrenItems) {
            return { ...p, next: { index } };
          }

          return p;
        });
      }

      if (depth === 2) {
        console.log(depth, 'открыть некст');

        setMenuState((p) => {
          if (!p.next) return { index };

          if (items?.[p.index]?.childrenItems?.[p.next.index]?.childrenItems) {
            return { ...p, next: { ...p.next, next: { ...p.next.next, index } } };
          }

          return p;
        });
      }
    },
    [items],
  );

  const addCurrentDepth = useCallback(
    (num: 1 | -1) => {
      if (num === -1) {
        setMenuState((p) => {
          console.log(p);

          let state: DepthState = p;
          let newState: DepthState = { index: p.index };

          while (state?.next) {
            if (state.next?.next) {
              newState = { ...newState, next: { index: state.next.index } };
            }

            state = state.next;
          }

          return newState;
        });
      }

      if (num === 1) {
        let state: DepthState = menuState;
        let depth = 0;

        while (state?.next) {
          state = state.next;
          depth++;
        }

        changeMenuState(0, depth + 1);
      }
    },
    [changeMenuState, menuState],
  );

  const addCurrentDepthIndex = useCallback(
    (num: number) => {
      if (menuState?.next?.next) {
        console.log('wwwww');

        setMenuState((p) => {
          if (!p.next?.next) return { index: 0 };

          console.log('wwwww2');

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
    useClickOutside: { handler: () => console.log('work2') },
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

  const arrowRightHandler = useCallback(() => {
    console.log('right');
    addCurrentDepth(1);
  }, [addCurrentDepth]);

  const arrowLeftHandler = useCallback(() => {
    console.log('left');
    addCurrentDepth(-1);
  }, [addCurrentDepth]);

  useGlobalKeydown({
    ArrowUp: [arrowUpHandler],
    ArrowDown: [arrowDownHandler],
    ArrowRight: [arrowRightHandler],
    ArrowLeft: [arrowLeftHandler],
  });

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
