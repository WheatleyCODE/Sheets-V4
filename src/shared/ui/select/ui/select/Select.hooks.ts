import { useCallback, useEffect, useRef, useState } from 'react';
import { useValidInput } from '../../../input';
import { IControllableMenuItem, useControllableMenu } from '../../../controllable-menu';
import { useDefaultEvents } from '@/shared/lib/hooks';
import type { IUseSelectHooksParams, IUseSelectReturnData } from './Select.interface';

export const useSelect = (params: IUseSelectHooksParams = {}): IUseSelectReturnData => {
  const { controllableMenu, input, select } = params;

  const ref = useRef<NodeJS.Timeout | null>(null);
  const [isShow, setShow] = useState(false);

  const changeIsShow = useCallback((boolean: boolean) => {
    setShow(boolean);
  }, []);

  const inputOnMouseEnter = useCallback(() => {
    ref.current = setTimeout(() => {
      changeIsShow(true);
    }, 500);
  }, [changeIsShow]);

  const inputOnMouseLeave = useCallback(() => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = null;
  }, []);

  const inputOnMouseDown = useCallback(() => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = null;
    changeIsShow(true);
  }, [changeIsShow]);

  const { data: defaultData, handlers: defaultHandlers } = useDefaultEvents(select?.default);
  const { data: inputData, handlers: inputHandlers } = useValidInput({
    input: input?.input,
    default: { onMouseEnter: inputOnMouseEnter, onMouseLeave: inputOnMouseLeave, onMouseDown: inputOnMouseDown },
  });
  const { data: menuData, handlers: menuHandlers } = useControllableMenu(controllableMenu);

  const selectItemAndClose = useCallback(
    (item?: IControllableMenuItem) => {
      const data = item || controllableMenu?.controllableMenu?.items[menuData.currentIndex];

      if (data) {
        inputData.changeValue(data.text);
      }

      changeIsShow(false);
    },
    [changeIsShow, menuData.currentIndex, inputData.changeValue],
  );

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === 'Enter') selectItemAndClose();
    };

    document.addEventListener('keydown', cb);

    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, [selectItemAndClose]);

  useEffect(() => {
    inputData.changeIsFocus(isShow);
  }, [isShow]);

  useEffect(() => {
    changeIsShow(inputData.isFocus);
  }, [changeIsShow, inputData.isFocus]);

  return {
    select: {
      data: {
        ...defaultData,
        isShow,
        changeIsShow,
        selectItemAndClose,
      },
      handlers: {
        ...defaultHandlers,
      },
    },

    input: {
      data: inputData,
      handlers: inputHandlers,
    },

    controllableMenu: {
      data: menuData,
      handlers: menuHandlers,
    },
  };
};
