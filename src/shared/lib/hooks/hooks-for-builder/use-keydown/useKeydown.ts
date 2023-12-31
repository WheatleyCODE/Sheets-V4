import { MutableRefObject, useCallback, useState, KeyboardEvent } from 'react';
import type { IUseKeydownParams, IUseKeydownResult } from './useKeydown.interface';

export const useKeydown = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseKeydownParams = {},
): IUseKeydownResult => {
  const { onChangeKey: onChangeKeyHandler, onKeyDown: onKeyDownHandler } = params;

  const [key, setKey] = useState('');

  const changeKey = useCallback(
    (key: string) => {
      setKey(key);
      onChangeKeyHandler?.(key);
    },
    [onChangeKeyHandler],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setKey(e.key);
      onKeyDownHandler?.(e);
    },
    [onKeyDownHandler],
  );

  return {
    data: {
      key,
    },

    dataChangers: {
      changeKey,
    },

    eventHandlers: {
      onKeyDown,
    },
  };
};
