import { useCallback, useContext } from 'react';
import { TabsContext } from './TabsContext';
import { ITabItem } from '../ui/tab-item/TabItem';

interface IUseTabsResult {
  items: ITabItem[];
  addItem: (item: ITabItem) => void;
  removeItem: (item: ITabItem) => void;
  currentValue: string | null;
  changeCurrentValue: (value: string | null) => void;
}

export const useTabs = (): IUseTabsResult => {
  const { setItems, items, currentValue, setCurrentValue } = useContext(TabsContext);

  const addItem = useCallback(
    (item: ITabItem) => {
      setItems((p) => [...p, item]);
    },
    [setItems],
  );

  const removeItem = useCallback(
    (item: ITabItem) => {
      setItems((p) => [...p].filter((itm) => item.itemId === itm.itemId));
    },
    [setItems],
  );

  const changeCurrentValue = useCallback(
    (value: string | null) => {
      setCurrentValue(value);
    },
    [setCurrentValue],
  );

  return {
    items,
    addItem,
    removeItem,
    currentValue,
    changeCurrentValue,
  };
};
