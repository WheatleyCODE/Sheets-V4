import { MutableRefObject, useCallback, useState, MouseEvent } from 'react';
import type { IUseClickParams, IUseClickResult } from './useClick.interface';

export const useClick = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseClickParams<T> = {},
): IUseClickResult<T> => {
  const {
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
    onClick: onClickHandler,
    onContextMenu: onContextMenuHandler,
    onChangeIsMouseDown,
  } = params;

  const [isMouseDown, setIsMouseDown] = useState(false);

  const changeIsMouseDown = useCallback(
    (boolean: boolean) => {
      setIsMouseDown(boolean);
      onChangeIsMouseDown?.(boolean);
    },
    [onChangeIsMouseDown],
  );

  const onMouseDown = useCallback(
    (e: MouseEvent<T>) => {
      setIsMouseDown(true);
      onMouseDownHandler?.(e);
    },
    [onMouseDownHandler],
  );

  const onMouseUp = useCallback(
    (e: MouseEvent<T>) => {
      setIsMouseDown(false);
      onMouseUpHandler?.(e);
    },
    [onMouseUpHandler],
  );

  const onClick = useCallback(
    (e: MouseEvent<T>) => {
      onClickHandler?.(e);
    },
    [onClickHandler],
  );

  const onContextMenu = useCallback(
    (e: MouseEvent<T>) => {
      onContextMenuHandler?.(e);
    },
    [onContextMenuHandler],
  );

  return {
    data: {
      isMouseDown,
    },

    dataChangers: {
      changeIsMouseDown,
    },

    eventHandlers: {
      onMouseDown,
      onMouseUp,
      onClick,
      onContextMenu,
    },
  };
};
