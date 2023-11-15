import { FC, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getDrawerConfig } from './Drawer.config';
import { classNames } from '@/shared/lib/class-names';
import type { IDrawerProps } from './Drawer.interface';
import styles from './Drawer.module.scss';

export const Drawer: FC<IDrawerProps> = memo((props) => {
  const { children, openStyles, isFull = true, width = 400, ...anotherProps } = props;

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const { initial, exit, animate } = useMemo(() => getDrawerConfig(openStyles, width), [openStyles, width]);

  return (
    <motion.div
      data-testid="drawer"
      {...anotherProps}
      onClick={stopPropagation}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.1 }}
      exit={exit}
      className={classNames(styles.drawer, { [styles.full]: isFull }, [styles[openStyles]])}
    >
      {children}
    </motion.div>
  );
});
