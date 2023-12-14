import { FocusEvent, MutableRefObject, useCallback, useState } from 'react';
import type { IUseFocusParams, IUseFocusResult } from './useFocus.interface';

export const useFocus = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseFocusParams<T> = {},
): IUseFocusResult<T> => {
  const {
    onBlur: onBlurHandler,
    onChangeIsFocus,
    onChangeIsTouched: onChangeIsTouchedHandler,
    onFocus: onFocusHandler,
  } = params;

  const [isFocus, setIsFocus] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const changeIsFocus = useCallback(
    (boolean: boolean) => {
      const el = ref.current;
      if (!el) return;

      boolean ? el.focus() : el.blur();

      setIsFocus(boolean);
      onChangeIsFocus?.(boolean);
    },
    [onChangeIsFocus, ref],
  );

  const changeIsTouched = useCallback(
    (boolean: boolean) => {
      setIsTouched(boolean);
      onChangeIsTouchedHandler?.(boolean);
    },
    [onChangeIsTouchedHandler],
  );

  const onFocus = useCallback(
    (e: FocusEvent<T>) => {
      setIsFocus(true);
      onFocusHandler?.(e);
    },
    [onFocusHandler],
  );

  const onBlur = useCallback(
    (e: FocusEvent<T>) => {
      setIsFocus(false);
      onBlurHandler?.(e);
    },
    [onBlurHandler],
  );

  return {
    data: {
      isFocus,
      isTouched,
    },

    dataChangers: {
      changeIsFocus,
      changeIsTouched,
    },

    eventHandlers: {
      onFocus,
      onBlur,
    },
  };
};
