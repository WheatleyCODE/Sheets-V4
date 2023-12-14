import { MouseEvent, MutableRefObject, useCallback, useState } from 'react';
import type { IUseHoverParams, IUseHoverResult } from './useHover.interface';

export const useHover = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseHoverParams<T> = {},
): IUseHoverResult<T> => {
  const {
    onMouseEnter: onMouseEnterHandler,
    onChangeIsHover,
    onMouseLeave: onMouseLeaveHandler,
    isMouseMove,
    onMouseMove: onMouseMoveHandler,
  } = params;

  const [isHover, setIsHover] = useState(false);

  const changeIsHover = useCallback(
    (boolean: boolean) => {
      setIsHover(boolean);
      onChangeIsHover?.(boolean);
    },
    [onChangeIsHover],
  );

  const onMouseEnter = useCallback(
    (e: MouseEvent<T>) => {
      setIsHover(true);
      onMouseEnterHandler?.(e);
    },
    [onMouseEnterHandler],
  );

  const onMouseLeave = useCallback(
    (e: MouseEvent<T>) => {
      setIsHover(false);
      onMouseLeaveHandler?.(e);
    },
    [onMouseLeaveHandler],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      onMouseMoveHandler?.(e);
    },
    [onMouseMoveHandler],
  );

  return {
    data: {
      isHover,
    },

    dataChangers: {
      changeIsHover,
    },

    eventHandlers: {
      onMouseEnter,
      onMouseLeave,
      onMouseMove: isMouseMove ? onMouseMove : undefined,
    },
  };
};
