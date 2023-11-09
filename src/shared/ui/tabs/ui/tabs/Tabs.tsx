import { FC, memo, useEffect } from 'react';
import { TabItem } from '../tab-item/TabItem';
import { intoIter } from 'shared/lib/iterators';
import { withProvider } from 'shared/lib/with-provider';
import { TabsProvider } from '../tabs-provider/TabsProvider';
import { useTabs } from '../../lib/TabsContext.hooks';
import { classNames } from 'shared/lib/class-names';
import type { ITabsProps } from './Tabs.interface';
import type { ITabItem } from '../tab-item/TabItem.interface';
import styles from './Tabs.module.scss';

const TabsWithoutContext: FC<ITabsProps> = memo((props) => {
  const { className, tabItems = [], initValue, children, ...anotherProps } = props;
  const { changeCurrentValue } = useTabs();

  useEffect(() => {
    changeCurrentValue(initValue);
  }, [changeCurrentValue, initValue]);

  const tabItemsArr = intoIter<ITabItem>(tabItems)
    .enumerate()
    .map(([tabItem, index]) => <TabItem itemId={index} children={tabItem.children} value={tabItem.value} />)
    .toArray();

  return (
    <div {...anotherProps} data-testid="tabs" className={classNames(styles.tabs, {}, [className])}>
      {children || tabItemsArr}
    </div>
  );
});

export const Tabs: FC<ITabsProps> = withProvider(TabsProvider)(TabsWithoutContext);
