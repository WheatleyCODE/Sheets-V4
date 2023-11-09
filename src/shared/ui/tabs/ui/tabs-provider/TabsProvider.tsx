import { FC, useMemo, useState } from 'react';
import { TabsContext } from '../../lib/TabsContext';
import type { ITabsProviderProps } from './TabsProvider.interface';

export const TabsProvider: FC<ITabsProviderProps> = ({ children, initItems = [], initCurrentValue = null }) => {
  const [items, setItems] = useState(initItems);
  const [currentValue, setCurrentValue] = useState(initCurrentValue);

  const defaultProps = useMemo(() => ({ items, setItems, currentValue, setCurrentValue }), [currentValue, items]);

  return <TabsContext.Provider value={defaultProps}>{children}</TabsContext.Provider>;
};
