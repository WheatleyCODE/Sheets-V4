import { FC, memo, useEffect } from 'react';
import { ITabItem, TabItem } from '../tab-item/TabItem';
import { intoIter } from 'shared/lib/iterators';
import { withProvider } from 'shared/lib/with-provider';
import { TabsProvider } from '../tabs-provider/TabsProvider';
import { useTabs } from '../../lib/useTabs';
import { classNames } from 'shared/lib/class-names';
import styles from './Tabs.module.scss';
interface ITabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabItems?: ITabItem[];
  initValue: string | null;
}

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
