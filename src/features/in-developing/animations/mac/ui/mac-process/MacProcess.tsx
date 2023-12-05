import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { IoIosCog } from 'react-icons/io';
import type { IMacProcessProps } from './MacProcess.interface';
import styles from './MacProcess.module.scss';

export const MacProcess: FC<IMacProcessProps> = (props) => {
  const { className, ...anotherProps } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      {...anotherProps}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      data-testid="macProcess"
      className={classNames(styles.mac_process, {}, [className])}
    >
      <div className={classNames(styles.mac_process_circle, {}, [styles._v1])}>
        <motion.div>
          <IoIosCog />
        </motion.div>

        <motion.div className={classNames(styles.mac_process_cog_shadow, { [styles.cog_rotate]: !isHover }, [])}>
          <IoIosCog />
        </motion.div>
      </div>
      <div className={classNames(styles.mac_process_circle, {}, [styles._v2])} />
      <div className={classNames(styles.mac_process_circle, {}, [styles._v3])} />
    </motion.div>
  );
};
