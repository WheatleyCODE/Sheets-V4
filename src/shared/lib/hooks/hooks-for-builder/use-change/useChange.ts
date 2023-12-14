import { MutableRefObject, useCallback, useState, ChangeEvent } from 'react';
import type { IUseChangeParams, IUseChangeResult } from './useChange.interface';

export const useChange = <T extends HTMLElement, V extends string>(
  ref: MutableRefObject<T | null>,
  params: IUseChangeParams<T, V> = {},
): IUseChangeResult<T, V> => {
  const { onChange: onChangeHandler, onChangeValue, initValue = '' as V } = params;

  const [value, setValue] = useState(initValue);

  const changeValue = useCallback(
    (value: V) => {
      setValue(value);
      onChangeValue?.(value);
    },
    [onChangeValue],
  );

  const onChange = useCallback(
    (e: ChangeEvent<T>) => {
      // @ts-ignore
      const value = e.target?.value as V;

      if (typeof value !== 'string') {
        throw new Error('useChange: target.value is not a string');
      }

      setValue(value);
      onChangeHandler?.(e);
    },
    [onChangeHandler],
  );

  return {
    data: {
      value,
    },

    dataChangers: {
      changeValue,
    },

    eventHandlers: {
      onChange,
    },
  };
};
