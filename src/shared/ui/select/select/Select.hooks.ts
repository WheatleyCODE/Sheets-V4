import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import { IUseClickParams, IUseClickResult, useClick } from '@/shared/lib/hooks/hooks-for-builder';
import { useValidInput } from '../../input';
import { UseValidInputParams } from '../../input/ui/input/Input.hooks';

export type UseSelectMergedTypes<T> = [IUseClickResult<T>];

export type UseSelectParams<T extends HTMLElement> = {
  useValidInput?: UseValidInputParams<T>;

  useClick?: IUseClickParams<T>;
};

const useSelectEvents = new HookBuilder<UseSelectMergedTypes<HTMLInputElement>, HTMLInputElement>()
  .enableMemo(new Cache())
  .addHook(useClick)
  .build();

export const useSelect = (params: UseSelectParams<HTMLInputElement> = {}) => {
  const { useValidInput: useValidInputParams, useClick } = params;

  const input = useValidInput(useValidInputParams);

  const { data, dataChangers, eventHandlers, ref } = useSelectEvents({
    useClick,
  });

  const controllableMenu = [];

  return {};
};
