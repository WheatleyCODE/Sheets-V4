import { FC, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getDrawerAnimations } from './Drawer.consts';
import { ANIMATION_DURATION } from '@/shared/consts';
import { classNames } from '@/shared/lib/class-names';
import type { IDrawerProps } from './Drawer.interface';
import styles from './Drawer.module.scss';

export const Drawer: FC<IDrawerProps> = (props) => {
  const { children, openStyles, width = 400, ...anotherProps } = props;

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const { initial, exit, animate } = useMemo(() => getDrawerAnimations(openStyles, width), [openStyles, width]);

  return (
    <motion.div
      data-testid="drawer"
      {...anotherProps}
      onClick={stopPropagation}
      initial={initial}
      animate={animate}
      transition={{ duration: ANIMATION_DURATION }}
      exit={exit}
      className={classNames(styles.drawer, {}, [styles[openStyles]])}
    >
      {children}
    </motion.div>
  );
};
