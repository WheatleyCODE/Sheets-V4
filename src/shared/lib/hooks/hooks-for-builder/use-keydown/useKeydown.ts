import { MutableRefObject, useCallback, useMemo, useState, useEffect } from 'react';
import type { IUseKeydownParams, IUseKeydownResult } from './useKeydown.interface';

export const useKeydown = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: IUseKeydownParams = {},
): IUseKeydownResult => {
  const { target = 'element', onChangeKey: onChangeKeyHandler, onKeyDown: onKeyDownHandler } = params;

  const [key, setKey] = useState('');

  const changeKey = useCallback(
    (key: string) => {
      setKey(key);
      onChangeKeyHandler?.(key);
    },
    [onChangeKeyHandler],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      setKey(e.key);
      onKeyDownHandler?.(e);
    };

    const element = target === 'element' ? el : document;

    element.addEventListener('keydown', onKeyDown as any);

    return () => {
      element.removeEventListener('keydown', onKeyDown as any);
    };
  }, [onKeyDownHandler, ref, target]);

  return {
    data: {
      key,
    },

    dataChangers: {
      changeKey,
    },

    eventHandlers: {},
  };
};
