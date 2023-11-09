import { Dispatch, SetStateAction } from 'react';
import type { ITabItem } from '../ui/tab-item/TabItem.interface';

export interface ITabsContextProps {
  items: ITabItem[];
  setItems: Dispatch<SetStateAction<ITabItem[]>>;

  currentValue: string | null;
  setCurrentValue: Dispatch<SetStateAction<string | null>>;
}

export interface IUseTabsResult {
  items: ITabItem[];
  addItem: (item: ITabItem) => void;
  removeItem: (item: ITabItem) => void;
  currentValue: string | null;
  changeCurrentValue: (value: string | null) => void;
}
