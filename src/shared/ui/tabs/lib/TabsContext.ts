import { createContext } from 'react';
import type { ITabsContextProps } from './TabsContext.interface';

const initContext: ITabsContextProps = {
  items: [],
  setItems: () => {},
  currentValue: null,
  setCurrentValue: () => {},
};

export const TabsContext = createContext<ITabsContextProps>(initContext);
