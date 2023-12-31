import { MutableRefObject, useCallback, useState, useRef, MouseEvent } from 'react';
import type { IUseDelayHoverParams, IUseDelayHoverResult } from './useDelayHover.interface';
import { useDebounce } from '../../use-debounce/useDebounce';

// ! Хук один и тот-же только один принимает реф, другой нет. Можно вложить один в другой

export const useDelayHover = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseDelayHoverParams<T> = {},
): IUseDelayHoverResult<T> => {
  const {
    onChangeIsHover,
    onChangeIsMove,
    onMouseLeave: onMouseLeaveHandler,
    onMouseEnterStart,
    onMouseEnterEnd,
    onClose: onCloseHandler,
    onMouseMove: onMouseMoveHandler,
    time = 700,
    delay = 500,
    refresh = 200,
  } = params;

  const [isHover, setIsHover] = useState(false);
  const [isMove, setIsMove] = useState(false);

  const first = useRef(false);
  const target = useRef(false);

  const onClose = useCallback(() => {
    setIsMove(false);
    onCloseHandler?.();
  }, [onCloseHandler]);

  const refreshFirst = useCallback(() => (first.current = false), []);

  const close = useDebounce(onClose, time);
  const refreshFirstHover = useDebounce(refreshFirst, refresh);

  const changeIsHover = useCallback(
    (boolean: boolean) => {
      setIsHover(boolean);
      onChangeIsHover?.(boolean);
    },
    [onChangeIsHover],
  );

  const changeIsMove = useCallback(
    (boolean: boolean) => {
      setIsMove(boolean);
      onChangeIsMove?.(boolean);
    },
    [onChangeIsMove],
  );

  const onMouseEnter = useCallback(
    (e: MouseEvent<T>) => {
      target.current = true;
      onMouseEnterStart?.(e);

      if (!first.current) {
        setTimeout(() => {
          if (target.current) {
            setIsHover(true);
            first.current = true;
            onMouseEnterEnd?.(e);
          }
        }, delay);
        return;
      }

      setIsHover(true);
    },
    [first, delay, target, onMouseEnterStart, onMouseEnterEnd],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      if (first.current) {
        setIsMove(true);
        onMouseMoveHandler?.(e);
      }
    },
    [first, onMouseMoveHandler],
  );

  const onMouseLeave = useCallback(
    (e: MouseEvent<T>) => {
      close();
      setIsHover(false);
      refreshFirstHover();
      onMouseLeaveHandler?.(e);
      target.current = false;
    },
    [close, refreshFirstHover, onMouseLeaveHandler],
  );

  return {
    data: {
      isHover,
      isMove,
      isShow: isHover || isMove,
    },

    dataChangers: {
      changeIsHover,
      changeIsMove,
    },

    eventHandlers: {
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
    },
  };
};
