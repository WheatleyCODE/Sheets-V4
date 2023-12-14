import { MutableRefObject, useCallback, useMemo, useState, useRef, MouseEvent } from 'react';
import type { IUseDelayHoverParams, IUseDelayHoverResult } from './useDelayHover.interface';
import { useDebounce } from '../../use-debounce/useDebounce';

export const useDelayHover = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseDelayHoverParams<T> = {},
): IUseDelayHoverResult<T> => {
  const {
    onChangeIsHover,
    onChangeIsMove,
    onMouseLeave: onMouseLeaveHandler,
    onMouseEnter: onMouseEnterHandler,
    onMouseMove: onMouseMoveHandler,
    time = 700,
    delay = 500,
    refresh = 200,
  } = params;

  const [isHover, setIsHover] = useState(false);
  const [isMove, setIsMove] = useState(false);

  const first = useRef(false);
  const target = useRef(false);

  const close = useDebounce(() => setIsMove(false), time);
  const refreshFirstHover = useDebounce(() => (first.current = false), refresh);

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

      if (!first.current) {
        setTimeout(() => {
          if (target.current) {
            setIsHover(true);
            first.current = true;
            onMouseEnterHandler?.(e);
          }
        }, delay);
        return;
      }

      setIsHover(true);
    },
    [first, delay, target, onMouseEnterHandler],
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

  const data = useMemo(
    () => ({
      isHover,
      isMove,
      isShow: isHover || isMove,
    }),
    [isHover, isMove],
  );

  const dataChangers = useMemo(
    () => ({
      changeIsHover,
      changeIsMove,
    }),
    [changeIsHover, changeIsMove],
  );

  const eventHandlers = useMemo(
    () => ({
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
    }),
    [onMouseEnter, onMouseLeave, onMouseMove],
  );

  return {
    data,
    dataChangers,
    eventHandlers,
  };
};
