// import { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import type {
//   IUseValidInputParams,
//   IUseValidInputResult,
//   PropsWithUseValidInput,
//   PropsWithoutUseValidInput,
//   ResultWithoutUseValidInput,
// } from './Input.interface';
// import { extractUseDefaultEventsProps, useDefaultEvents } from '@/shared/lib/hooks';

import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import {
  IUseChangeParams,
  IUseChangeResult,
  IUseClickParams,
  IUseClickResult,
  IUseFocusParams,
  IUseFocusResult,
  useChange,
  useClick,
  useFocus,
} from '@/shared/lib/hooks/hooks-for-builder';
import { Validator } from '@/shared/lib/validators/get-validator/getValidator.interface';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

// export const extractUseValidInputProps = <P extends object, EL, T extends string>(
//   props: PropsWithUseValidInput<P, EL, T>,
// ): ResultWithoutUseValidInput<P, EL, T> => {
//   const [props1, defData, defHandlers] = extractUseDefaultEventsProps(props);

//   const { value, changeValue, isError, changeIsError, validError, changeValidError, onChange, ...anotherProps } =
//     props1;

//   return [
//     anotherProps as PropsWithoutUseValidInput<P, EL, T>,
//     { ...defData, value, changeValue, isError, changeIsError, validError, changeValidError },
//     { ...defHandlers, onChange },
//   ];
// };

// export const useValidInput = <T = string>(
//   params: IUseValidInputParams<T> = {},
// ): IUseValidInputResult<T, HTMLInputElement> => {
//   const { input = { initialValue: '' as T, validators: [] }, default: def } = params;

//   const { data, handlers } = useDefaultEvents<HTMLInputElement>(def);
//   const [value, setValue] = useState(input.initialValue);
//   const [validError, setValidError] = useState<null | string>(null);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     setIsError(!!(data.isTouched && validError));
//   }, [data.isTouched, validError]);

//   const changeValidError = useCallback((value: string | null) => {
//     setValidError(value);
//   }, []);

//   const changeIsError = useCallback((boolean: boolean) => {
//     setIsError(boolean);
//   }, []);

//   const changeValue = useCallback(
//     (string: T) => {
//       setValue(string);

//       if (typeof string === 'string') {
//         input.validators?.forEach((fn) => {
//           setValidError(fn(string));
//         });
//       }
//     },
//     [input.validators],
//   );

//   const onChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       setValue(e.target.value as T);

//       input.validators?.forEach((fn) => {
//         setValidError(fn(e.target.value));
//       });
//     },
//     [input.validators],
//   );

//   return {
//     data: {
//       ...data,
//       value,
//       changeValue,
//       isError,
//       changeIsError,
//       validError,
//       changeValidError,
//     },

//     handlers: {
//       ...handlers,
//       onChange,
//     },
//   };
// };

export type UseValidInputMergedTypes<T, V extends string> = [
  IUseChangeResult<T, V>,
  IUseFocusResult<T>,
  IUseClickResult<T>,
];

const useValidInputEvents = new HookBuilder<UseValidInputMergedTypes<HTMLInputElement, string>, HTMLInputElement>()
  .enableMemo(new Cache())
  .addHook(useChange)
  .addHook(useFocus)
  .addHook(useClick)
  .build();

export type UseValidInputResult = ReturnType<typeof useValidInput>;

export type UseValidInputParams<T extends HTMLElement> = {
  useChange?: IUseChangeParams<T, string>;
  useFocus?: IUseFocusParams<T>;
  useClick?: IUseClickParams<T>;

  validators?: Validator[];
  initValue?: string;
};

export const useValidInput = (params: UseValidInputParams<HTMLInputElement> = {}) => {
  const { useChange, useFocus, useClick, initValue = '', validators = [] } = params;

  const [validError, setValidError] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  const checkValue = useCallback(
    (string: string) => {
      validators?.forEach((fn) => {
        setValidError(fn(string));
      });
    },
    [validators],
  );

  const checkValueInEvent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      validators?.forEach((fn) => {
        setValidError(fn(e.target.value));
      });
    },
    [validators],
  );

  const useChangeParams: IUseChangeParams<HTMLInputElement, string> = useMemo(
    () => ({ initValue, onChange: checkValueInEvent, onChangeValue: checkValue, ...useChange }),
    [checkValue, checkValueInEvent, initValue, useChange],
  );

  const { data, dataChangers, eventHandlers, ref } = useValidInputEvents({
    useChange: useChangeParams,
    useFocus,
    useClick,
  });

  useEffect(() => {
    setIsError(!!(data.isTouched && validError));
  }, [data.isTouched, validError]);

  const changeValidError = useCallback((value: string | null) => {
    setValidError(value);
  }, []);

  const changeIsError = useCallback((boolean: boolean) => {
    setIsError(boolean);
  }, []);

  return {
    data: useMemo(() => ({ ...data, validError, isError }), [data, isError, validError]),

    dataChangers: useMemo(
      () => ({ ...dataChangers, changeValidError, changeIsError }),
      [changeIsError, changeValidError, dataChangers],
    ),

    eventHandlers,
    ref,
  };
};
