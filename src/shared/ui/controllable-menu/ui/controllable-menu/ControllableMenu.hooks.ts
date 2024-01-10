import { useCallback, useMemo, useState } from 'react';
import { IUseKeydownParams, useKeydown } from '@/shared/lib/hooks/hooks-for-builder';
import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import { useGlobalKeydown } from '@/shared/lib/hooks';
import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from './ControllableMenu.consts';
import type {
  DepthState,
  IControllableMenuItem,
  UseControllableMenuMergedTypes,
  UseControllableMenuParams,
} from './ControllableMenu.interface';

const useKeydownParams: IUseKeydownParams = { onKeyDown: (e) => e.preventDefault() };

const useControllableMenuEvents = new HookBuilder<UseControllableMenuMergedTypes, HTMLDivElement>()
  .enableMemo(new Cache())
  .addHook(useKeydown, useKeydownParams)
  .build();

export type UseControllableMenuResult = ReturnType<typeof useControllableMenu>;

export const useControllableMenu = (params: UseControllableMenuParams = {}) => {
  const {
    items = [],
    initActiveIndex = 0,
    onSelectItem,
    isHorizontalReverse = false,
    isDisableKeydown = false,
    isScrollControl = false,
    onChangeCurrentIndex,
  } = params;

  const [menuState, setMenuState] = useState<DepthState>({ index: initActiveIndex });

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
      onChangeCurrentIndex?.();

      if (menuState?.next?.next) {
        const length = items[menuState.index].childrenItems?.[menuState.next.index].childrenItems?.length || 0;

        setMenuState((p) => {
          if (!p.next?.next) return { index: 0 };

          if (p.next.next.index + num > length - 1) {
            return { ...p, next: { ...p.next, next: { ...p.next.next, index: p.next.next.index } } };
          }

          if (p.next.next.index + num < 0) {
            return { ...p, next: { ...p.next, next: { ...p.next.next, index: 0 } } };
          }

          return { ...p, next: { ...p.next, next: { ...p.next.next, index: p.next.next.index + num } } };
        });

        return;
      }

      if (menuState?.next) {
        const length = items[menuState.index].childrenItems?.length || 0;

        setMenuState((p) => {
          if (!p.next) return { index: 0 };

          if (p.next.index + num > length - 1) {
            return { ...p, next: { ...p.next, index: p.next.index } };
          }

          if (p.next.index + num < 0) {
            return { ...p, next: { ...p.next, index: 0 } };
          }

          return { ...p, next: { ...p.next, index: p.next.index + num } };
        });

        return;
      }

      setMenuState((p) => {
        if (p.index + num > items.length - 1) {
          return { ...p, index: p.index };
        }

        if (p.index + num < 0) {
          return { ...p, index: 0 };
        }
        return { ...p, index: p.index + num };
      });
    },
    [items, menuState, onChangeCurrentIndex],
  );

  const { data, dataChangers, eventHandlers, ref } = useControllableMenuEvents();

  const arrowUpHandler = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      const menu = ref.current;
      if (!menu) return;

      addCurrentDepthIndex(-1);

      if (!isScrollControl) return;

      const menuHeight = menu.clientHeight;
      const scrollTop = menu.scrollTop;
      const currentItemHeight = (menuState.index + 2) * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING;

      if (currentItemHeight + CONTROLLABLE_MENU_ITEM_HEIGHT * 2 - scrollTop < menuHeight) {
        menu.scrollTop = scrollTop - CONTROLLABLE_MENU_ITEM_HEIGHT;
      }
    },
    [addCurrentDepthIndex, isScrollControl, menuState.index, ref],
  );
  const arrowDownHandler = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      const menu = ref.current;
      if (!menu) return;

      addCurrentDepthIndex(1);

      if (!isScrollControl) return;

      const menuHeight = menu.clientHeight;
      const scrollTop = menu.scrollTop;
      const currentItemHeight = (menuState.index + 2) * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING;

      if (currentItemHeight - scrollTop > menuHeight) {
        menu.scrollTop = currentItemHeight - menuHeight + CONTROLLABLE_MENU_PADDING;
      }
    },
    [addCurrentDepthIndex, isScrollControl, menuState.index, ref],
  );

  const arrowRightHandler = useCallback(() => {
    addCurrentDepth(1);
  }, [addCurrentDepth]);

  const arrowLeftHandler = useCallback(() => {
    addCurrentDepth(-1);
  }, [addCurrentDepth]);

  const selectCurrentItem = useCallback(() => {
    if (menuState?.next?.next) {
      const currentItems = items[menuState.index].childrenItems?.[menuState.next.index].childrenItems;
      const currentItem = currentItems?.[menuState.next.next.index];

      if (currentItem) onSelectItem?.(currentItem);
      return;
    }

    if (menuState?.next) {
      const currentItems = items[menuState.index].childrenItems;
      const currentItem = currentItems?.[menuState.next.index];

      if (currentItem) onSelectItem?.(currentItem);
      return;
    }

    onSelectItem?.(items[menuState.index]);
  }, [items, menuState, onSelectItem]);

  const selectItem = useCallback(
    (item: IControllableMenuItem) => {
      onSelectItem?.(item);
    },
    [onSelectItem],
  );

  const closeAllSubMenus = useCallback(() => {
    changeMenuState(menuState.index, 0);
  }, [changeMenuState, menuState.index]);

  useGlobalKeydown({
    ArrowUp: isDisableKeydown ? [] : [arrowUpHandler],
    ArrowDown: isDisableKeydown ? [] : [arrowDownHandler],
    ArrowRight: isDisableKeydown ? [] : isHorizontalReverse ? [arrowLeftHandler] : [arrowRightHandler],
    ArrowLeft: isDisableKeydown ? [] : isHorizontalReverse ? [arrowRightHandler] : [arrowLeftHandler],
    Enter: isDisableKeydown ? [] : [selectCurrentItem],
    Escape: isDisableKeydown ? [] : [closeAllSubMenus],
  });

  return {
    data: useMemo(() => ({ ...data, items, menuState }), [menuState, data, items]),
    dataChangers: useMemo(
      () => ({
        ...dataChangers,
        changeMenuState,
        addCurrentDepthIndex,
        closeAllSubMenus,
        selectCurrentItem,
        selectItem,
      }),
      [addCurrentDepthIndex, changeMenuState, closeAllSubMenus, dataChangers, selectCurrentItem, selectItem],
    ),
    eventHandlers,
    ref,
  };
};
