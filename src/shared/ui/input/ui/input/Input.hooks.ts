import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import type { IValidInputResult, IValidator } from './Input.interface';
import { useDefaultEvents } from '@/shared/lib/hooks';

export const useValidInput = <T = string>(
  init: T,
  validators?: IValidator[],
): IValidInputResult<T, HTMLInputElement> => {
  const { data, handlers } = useDefaultEvents<HTMLInputElement>();
  const [value, setValue] = useState(init);
  const [validError, setValidError] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(!!(data.isTouched && validError));
  }, [data.isTouched, validError]);

  const changeValidError = useCallback((value: string | null) => {
    setValidError(value);
  }, []);

  const changeIsError = useCallback((boolean: boolean) => {
    setIsError(boolean);
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

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as T);

      validators?.forEach((fn) => {
        setValidError(fn(e.target.value));
      });
    },
    [validators],
  );

  return {
    data: {
      ...data,
      value,
      changeValue,
      isError,
      changeIsError,
      validError,
      changeValidError,
    },

    handlers: {
      ...handlers,
      onChange,
    },
  };
};
