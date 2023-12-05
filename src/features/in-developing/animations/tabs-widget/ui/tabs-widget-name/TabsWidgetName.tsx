import { FC } from 'react';
import { motion } from 'framer-motion';
import { FAST_DURATION } from '../../../../consts/animations';
import { classNames } from '@/shared/lib/class-names';
import type { ITabsWidgetNameProps } from './TabsWidgetName.interface';
import styles from './TabsWidgetName.module.scss';

export const TabsWidgetName: FC<ITabsWidgetNameProps> = (props) => {
  const { className, Icon, isActive, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      data-testid="tabsWidgetName"
      transition={{ duration: FAST_DURATION }}
      className={classNames(styles.tabs_widget_name, { [styles.active]: isActive }, [className])}
    >
      <Icon />
    </motion.div>
  );
};
