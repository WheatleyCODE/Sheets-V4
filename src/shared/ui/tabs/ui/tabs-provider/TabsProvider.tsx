import { FC, useMemo, useState } from 'react';
import { TabsContext } from '../../lib/TabsContext';
import { ITabItem } from '../tab-item/TabItem';

export interface ITabsProviderProps extends FCProps {
  initItems?: ITabItem[];
  initCurrentValue?: string | null;
}

export const TabsProvider: FC<ITabsProviderProps> = ({ children, initItems = [], initCurrentValue = null }) => {
  const [items, setItems] = useState(initItems);
  const [currentValue, setCurrentValue] = useState(initCurrentValue);

  const defaultProps = useMemo(() => ({ items, setItems, currentValue, setCurrentValue }), [currentValue, items]);

  return <TabsContext.Provider value={defaultProps}>{children}</TabsContext.Provider>;
};
