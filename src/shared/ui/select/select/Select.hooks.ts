import { useCallback, useEffect, useState } from 'react';
import { Cache } from '@/shared/lib/cache';
import { HookBuilder } from '@/shared/lib/hook-builder';
import { useClick } from '@/shared/lib/hooks/hooks-for-builder';
import { useValidInput } from '../../input';
import { useControllableMenu } from '../../controllable-menu';
import type { UseSelectMergedTypes, UseSelectParams } from './Select.interface';

const useSelectEvents = new HookBuilder<UseSelectMergedTypes<HTMLInputElement>, HTMLInputElement>()
  .enableMemo(new Cache())
  .addHook(useClick)
  .build();

export type UseSelectResult = ReturnType<typeof useSelect>;

export const useSelect = (params: UseSelectParams<HTMLInputElement> = {}) => {
  const { useValidInput: useValidInputParams, useClick, useControllableMenu: useControllableMenuParams = {} } = params;
  const { onSelectItem } = useControllableMenuParams;

  const [isShow, setIsShow] = useState(false);

  const closeMenu = useCallback(() => {
    setIsShow(false);
  }, []);

  const input = useValidInput(useValidInputParams);

  const controllableMenu = useControllableMenu({
    ...useControllableMenuParams,
    onSelectItem: (item) => {
      input.dataChangers.changeValue(item.text);
      input.dataChangers.changeIsFocus(false);
      setIsShow(false);

      onSelectItem?.(item);
    },
    isDisableKeydown: !input.data.isFocus,
    isScrollControl: true,
  });

  useEffect(() => {
    controllableMenu.dataChangers.changeMenuState(0, 0);
  }, [input.data.isFocus]);

  const select = useSelectEvents({
    useClick: {
      ...useClick,
      onClick: () => {
        setTimeout(() => {
          setIsShow(true);
        }, 0);
      },
    },
  });

  return {
    input,
    controllableMenu,
    select: { ...select, data: { ...select.data, isShow }, dataChangers: { ...select.dataChangers, closeMenu } },
  };
};
