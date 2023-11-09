import React, { useCallback, useState } from 'react';
import type { IValidInputOpts, IValidator } from './Input.interface';

export const useValidInput = <T = string>(init: T, validators?: IValidator[]): IValidInputOpts<T> => {
  const [value, setValue] = useState(init);
  const [isFocus, setIsFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [validError, setValidError] = useState<null | string>(null);
  const [isTouched, setIsTouched] = useState(false);

  const onBlur = useCallback(() => {
    setIsTouched(true);
    setIsFocus(false);

    if (!value) setIsActive(false);
  }, [value]);

  const onFocus = useCallback(() => {
    setIsFocus(true);
    setIsActive(true);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);

    validators?.forEach((fn) => {
      setValidError(fn(e.target.value));
    });
  }, []);

  const changeFocus = useCallback((boolean: boolean) => {
    setIsFocus(boolean);
  }, []);

  const changeActive = useCallback((boolean: boolean) => {
    setIsActive(boolean);
  }, []);

  const changeValue = useCallback(
    (string: T) => {
      setValue(string);

      if (typeof string === 'string') {
        validators?.forEach((fn) => {
          setValidError(fn(string));
        });
      }
    },
    [validators],
  );

  return {
    value,
    isFocus,
    isActive,
    onChange,
    onBlur,
    onFocus,
    isError: !!(isTouched && validError),
    isTouched,
    validError,
    changeValue,
    changeFocus,
    changeActive,
  };
};
