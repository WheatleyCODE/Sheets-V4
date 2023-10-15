import { useCallback, useContext } from 'react';
import { DragLineContext } from './DragLineContext';
import { IDragLineItem } from '../ui/drag-line-item/DragLineItem';

interface IUseDragLineResult {
  items: IDragLineItem[];
  addItem: (item: IDragLineItem) => void;
  removeItem: (item: IDragLineItem) => void;
}

export const useDragLine = (): IUseDragLineResult => {
  const { setItems, items } = useContext(DragLineContext);

  const addItem = useCallback(
    (item: IDragLineItem) => {
      setItems((p) => [...p, item]);
    },
    [setItems],
  );

  const removeItem = useCallback(
    (item: IDragLineItem) => {
      setItems((p) => [...p].filter((itm) => item.itemId === itm.itemId));
    },
    [setItems],
  );

  return {
    items,
    addItem,
    removeItem,
  };
};
