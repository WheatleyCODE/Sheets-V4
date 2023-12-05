import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_DURATION } from '../../../../consts/animations';
import { classNames } from '@/shared/lib/class-names';
import type { ITabsWidgetItemProps } from './TabsWidgetItem.interface';
import styles from './TabsWidgetItem.module.scss';

export const TabsWidgetItem: FC<ITabsWidgetItemProps> = (props) => {
  const { className, Icon, style, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="tabsWidgetItem"
      className={classNames(styles.tabs_widget_item, {}, [className])}
      exit={{ opacity: 0, translateY: -60 }}
      animate={{ opacity: 1, translateY: 0 }}
      initial={{ opacity: 0, translateY: 60 }}
      transition={{ duration: DEFAULT_DURATION }}
      style={style}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      <Icon />
    </motion.div>
  );
};
