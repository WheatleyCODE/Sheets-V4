import { FC, memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Tabs.module.scss';
import { ITabItem, TabItem } from '../tab-item/TabItem';
import { intoIter } from 'shared/lib/iterators';

interface ITabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabItems?: ITabItem[];
  initValue?: string;
  onTabClick: (value?: string) => void;
}

export const Tabs: FC<ITabsProps> = memo((props) => {
  const { className, tabItems = [], initValue, onTabClick, ...anotherProps } = props;
  const [currentValue, setCurrentValue] = useState(initValue);

  const onTabSelect = useCallback(
    (value: string) => {
      onTabClick(value);
      setCurrentValue(value);
    },
    [onTabClick],
  );

  const tabItemsArr = intoIter<ITabItem>(tabItems)
    .map((tabItem) => <TabItem onTabSelect={onTabSelect} currentValue={currentValue} tabItem={tabItem} />)
    .toArray();

  return (
    <div {...anotherProps} data-testid="tabs" className={classNames(styles.tabs, {}, [className])}>
      {tabItemsArr}
    </div>
  );
});
