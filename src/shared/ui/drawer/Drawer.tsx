import { FC, memo, useCallback, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { getDrawerConfig } from './drawer.config';
import { classNames } from 'shared/lib/class-names';
import { DrawerOpenStyles } from './interface';
import styles from './Drawer.module.scss';

export interface IDrawerProps extends MotionProps {
  children: React.ReactNode;
  openStyles: DrawerOpenStyles;
  width?: number;
  isFull?: boolean;
}

export const Drawer: FC<IDrawerProps> = memo((props) => {
  const { children, openStyles, isFull = true, width = 400, ...anotherProps } = props;

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const { initial, exit, animate } = useMemo(() => getDrawerConfig(openStyles, width), [openStyles, width]);

  return (
    <motion.div
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
