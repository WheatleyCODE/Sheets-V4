import { useCallback, useState } from 'react';
import { useValidInput } from '../../../input';
import { useControllableMenu } from '../../../controllable-menu';

export const useSelect = () => {
  const [isShow, setShow] = useState(false);

  const { data: inputData, handlers: inputHandlers } = useValidInput({ input: { initialValue: '' } });

  const { data: menuData, handlers: menuHandlers } = useControllableMenu({
    controllableMenu: {
      items: [],
      onChangeIndex(item) {
        console.log(item);
      },
      isRefreshIndex: true,
    },
  });

  const changeShow = useCallback((boolean: boolean) => {
    setShow(boolean);
  }, []);

  return {
    select: {
      data: {
        isShow,
        changeShow,
      },
      handlers: {},
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
