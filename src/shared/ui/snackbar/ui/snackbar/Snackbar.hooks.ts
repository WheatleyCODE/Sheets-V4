import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import {
  IUseClickResult,
  useClick,
  useKeydown,
  IUseKeydownResult,
  IUseClickParams,
  IUseKeydownParams,
} from '@/shared/lib/hooks/hooks-for-builder';
import { useCallback, useMemo, useState } from 'react';

export type UseSnackbarMergedTypes<T> = [IUseClickResult<T>, IUseKeydownResult];

export const useSnackbarEvents = new HookBuilder<UseSnackbarMergedTypes<HTMLDivElement>, HTMLDivElement>()
  .enableMemo(new Cache())
  .addHook(useClick)
  .addHook(useKeydown)
  .build();

export type UseSnackbarResult = ReturnType<typeof useSnackbar>;

export type UseSnackbarParams<T extends HTMLElement> = {
  useSnackbar?: {
    useClick?: IUseClickParams<T>;
    useKeydown?: IUseKeydownParams;
  };
};

export const useSnackbar = (params: UseSnackbarParams<HTMLDivElement> = {}) => {
  const { useSnackbar } = params;
  const [isShow, setIsShow] = useState(true);

  const changeIsShow = useCallback((boolean: boolean) => setIsShow(boolean), []);
  const toggleIsShow = useCallback(() => setIsShow((p) => !p), []);

  const { data, dataChangers, eventHandlers, ref } = useSnackbarEvents({
    useClick: useSnackbar?.useClick,
    useKeydown: useSnackbar?.useKeydown,
  });

  return {
    data: useMemo(
      () => ({
        ...data,
        isShow,
      }),
      [data, isShow],
    ),

    dataChangers: useMemo(
      () => ({
        ...dataChangers,
        changeIsShow,
        toggleIsShow,
      }),
      [changeIsShow, dataChangers, toggleIsShow],
    ),

    eventHandlers,
    ref,
  };
};
