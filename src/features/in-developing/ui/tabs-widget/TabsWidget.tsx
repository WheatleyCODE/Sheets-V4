import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ITabsWidgetProps } from './TabsWidget.interface';
import styles from './TabsWidget.module.scss';

export const TabsWidget: FC<ITabsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="tabsWidget" className={classNames(styles.tabs_widget, {}, [className])}>
      TabsWidget 
    </div>
  );
};
