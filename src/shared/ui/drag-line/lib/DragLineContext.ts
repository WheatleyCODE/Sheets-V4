import { Dispatch, SetStateAction, createContext } from 'react';
import { IDragLineItem } from '../ui/drag-line-item/DragLineItem';

export interface IDragLineContextProps {
  items: IDragLineItem[];
  setItems: Dispatch<SetStateAction<IDragLineItem[]>>;
}

const initContext: IDragLineContextProps = { items: [], setItems: () => {} };

export const DragLineContext = createContext<IDragLineContextProps>(initContext);
