import { FocusEvent, MouseEvent, useCallback, useState } from 'react';
import type {
  IUseDefaultEventsOpts,
  IUseDefaultEventsResult,
  IUseDefaultEventsResultData,
  IUseDefaultEventsResultHandlers,
} from './useDefaultEvents.interface';

export type PropsWithoutUseDefaultEvents<P extends object, EL> = Omit<
  P,
  keyof IUseDefaultEventsResultData | keyof IUseDefaultEventsResultHandlers<EL>
>;

export type PropsWithUseDefaultEvents<P extends object, EL> = P &
  IUseDefaultEventsResultData &
  IUseDefaultEventsResultHandlers<EL>;

export type ResultWithoutUseDefaultEvents<P extends object, EL> = ExtractedProps<
  PropsWithoutUseDefaultEvents<P, EL>,
  IUseDefaultEventsResultData,
  IUseDefaultEventsResultHandlers<EL>
>;

export const extractUseDefaultEventsProps = <P extends object, EL = HTMLElement>(
  props: PropsWithUseDefaultEvents<P, EL>,
): ResultWithoutUseDefaultEvents<P, EL> => {
  const {
    isFocus,
    changeIsFocus,
    isTouched,
    changeIsTouched,
    isMouseDown,
    changeIsMouseDown,
    isHover,
    changeIsHover,

    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    ...anotherProps
  } = props;

  return [
    anotherProps,
    {
      isFocus,
      changeIsFocus,
      isTouched,
      changeIsTouched,
      isMouseDown,
      changeIsMouseDown,
      isHover,
      changeIsHover,
    },
    {
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
    },
  ];
};

export const useDefaultEvents = <T = HTMLElement>(opts: IUseDefaultEventsOpts<T> = {}): IUseDefaultEventsResult<T> => {
  const {
    onBlur: onBlurHandler,
    onFocus: onFocusHandler,
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave: onMouseLeaveHandler,
  } = opts;
  const [isFocus, setIsFocus] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const changeIsHover = useCallback((boolean: boolean) => {
    setIsHover(boolean);
  }, []);

  const changeIsMouseDown = useCallback((boolean: boolean) => {
    setIsMouseDown(boolean);
  }, []);

  const changeIsFocus = useCallback((boolean: boolean) => {
    setIsFocus(boolean);
  }, []);

  const changeIsTouched = useCallback((boolean: boolean) => {
    setIsTouched(boolean);
  }, []);

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

  const onBlur = useCallback(
    (e: FocusEvent<T>) => {
      setIsTouched(true);
      setIsFocus(false);
      onBlurHandler?.(e);
    },
    [onBlurHandler],
  );

  const onFocus = useCallback(
    (e: FocusEvent<T>) => {
      setIsFocus(true);
      onFocusHandler?.(e);
    },
    [onFocusHandler],
  );

  return {
    data: {
      isFocus,
      changeIsFocus,
      isTouched,
      changeIsTouched,
      isMouseDown,
      changeIsMouseDown,
      isHover,
      changeIsHover,
    },

    handlers: {
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
    },
  };
};
