import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { IoIosCog } from 'react-icons/io';
import type { IMacProcessProps } from './MacProcess.interface';
import styles from './MacProcess.module.scss';

export const MacProcess: FC<IMacProcessProps> = (props) => {
  const { className, ...anotherProps } = props;
  return (
    <div {...anotherProps} data-testid="macProcess" className={classNames(styles.mac_process, {}, [className])}>
      <div className={classNames(styles.mac_process_circle, {}, [styles._v1])}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className={classNames(styles.mac_process_cog, {}, [])}
        >
          <IoIosCog />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className={classNames(styles.mac_process_cog_shadow, {}, [])}
        >
          <IoIosCog />
        </motion.div>
      </div>
      <div className={classNames(styles.mac_process_circle, {}, [styles._v2])} />
      <div className={classNames(styles.mac_process_circle, {}, [styles._v3])} />
    </div>
  );
};
