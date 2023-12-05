import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_DURATION_X2 } from '../../consts/animations';
import { classNames } from '@/shared/lib/class-names';
import type { IPlatformProps } from './Platform.interface';
import styles from './Platform.module.scss';

export const Platform: FC<IPlatformProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <motion.div
      initial={{ translateX: 200, translateY: 200, opacity: 0 }}
      animate={{ translateX: 0, translateY: 0, opacity: 1, rotateX: 45, rotateY: -10, rotateZ: 45 }}
      transition={{ duration: DEFAULT_DURATION_X2 }}
      {...anotherProps}
      data-testid="platform"
      className={classNames(styles.platform, {}, [className])}
    >
      {children}
    </motion.div>
  );
};
