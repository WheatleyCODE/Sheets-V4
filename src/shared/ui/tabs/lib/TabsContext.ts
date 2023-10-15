import { Dispatch, SetStateAction, createContext } from 'react';
import { ITabItem } from '../ui/tab-item/TabItem';

export interface ITabsContextProps {
  items: ITabItem[];
  setItems: Dispatch<SetStateAction<ITabItem[]>>;

  currentValue: string | null;
  setCurrentValue: Dispatch<SetStateAction<string | null>>;
}

const initContext: ITabsContextProps = {
  items: [],
  setItems: () => {},
  currentValue: null,
  setCurrentValue: () => {},
};

export const TabsContext = createContext<ITabsContextProps>(initContext);
