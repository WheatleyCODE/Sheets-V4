import { Dispatch, SetStateAction } from 'react';
import type { IDragLineItem } from '../ui/drag-line-item/DragLineItem.interface';

export interface IDragLineContextProps {
  items: IDragLineItem[];
  setItems: Dispatch<SetStateAction<IDragLineItem[]>>;
}

export interface IUseDragLineResult {
  items: IDragLineItem[];
  addItem: (item: IDragLineItem) => void;
  removeItem: (item: IDragLineItem) => void;
}
