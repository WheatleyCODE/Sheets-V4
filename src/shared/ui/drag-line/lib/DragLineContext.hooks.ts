import { useCallback, useContext } from 'react';
import { DragLineContext } from './DragLineContext';
import type { IUseDragLineResult } from './DragLineContext.interface';
import type { IDragLineItem } from '../ui/drag-line-item/DragLineItem.interface';

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
