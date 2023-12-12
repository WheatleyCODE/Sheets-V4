import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import type {
  IUseValidInputParams,
  IUseValidInputResult,
  PropsWithUseValidInput,
  PropsWithoutUseValidInput,
  ResultWithoutUseValidInput,
} from './Input.interface';
import { extractUseDefaultEventsProps, useDefaultEvents } from '@/shared/lib/hooks';

export const extractUseValidInputProps = <P extends object, EL, T extends string>(
  props: PropsWithUseValidInput<P, EL, T>,
): ResultWithoutUseValidInput<P, EL, T> => {
  const [props1, defData, defHandlers] = extractUseDefaultEventsProps(props);

  const { value, changeValue, isError, changeIsError, validError, changeValidError, onChange, ...anotherProps } =
    props1;

  return [
    anotherProps as PropsWithoutUseValidInput<P, EL, T>,
    { ...defData, value, changeValue, isError, changeIsError, validError, changeValidError },
    { ...defHandlers, onChange },
  ];
};

export const useValidInput = <T = string>(
  params: IUseValidInputParams<T> = {},
): IUseValidInputResult<T, HTMLInputElement> => {
  const { input = { initialValue: '' as T, validators: [] }, default: def } = params;

  const { data, handlers } = useDefaultEvents<HTMLInputElement>(def);
  const [value, setValue] = useState(input.initialValue);
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
        input.validators?.forEach((fn) => {
          setValidError(fn(string));
        });
      }
    },
    [input.validators],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as T);

      input.validators?.forEach((fn) => {
        setValidError(fn(e.target.value));
      });
    },
    [input.validators],
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
