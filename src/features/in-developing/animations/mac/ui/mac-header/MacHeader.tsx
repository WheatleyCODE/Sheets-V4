import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { IMacHeaderProps } from './MacHeader.interface';
import styles from './MacHeader.module.scss';

export const MacHeader: FC<IMacHeaderProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <motion.div {...anotherProps} data-testid="macHeader" className={classNames(styles.mac_header, {}, [className])}>
      <div className={classNames(styles.mac_controls, {}, [className])}>
        <div className={classNames(styles.mac_circle, {}, [styles.red])} />
        <div className={classNames(styles.mac_circle, {}, [styles.yellow])} />
        <div className={classNames(styles.mac_circle, {}, [styles.green])} />
      </div>
      {children}
    </motion.div>
  );
};
