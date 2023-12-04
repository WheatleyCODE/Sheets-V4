import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { IImageWidgetProps } from './ImageWidget.interface';
import styles from './ImageWidget.module.scss';

export const ImageWidget: FC<IImageWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageWidget" className={classNames(styles.image_widget, {}, [className])}>
      <motion.div
        animate={{
          translateY: [0, 3, 0, -3, 0],
          rotate: [0, 1, 0, -1, 0],
          translateX: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity,
        }}
        className={classNames(styles.image, {}, [])}
      >
        <div className={classNames(styles.mountain, {}, [styles._v1])} />
        <div className={classNames(styles.mountain, {}, [styles._v2])} />
      </motion.div>

      <div className={classNames(styles.arrow, {}, [])}>
        <div className={classNames(styles.arrow_line, {}, [styles._v1])} />
        <div className={classNames(styles.arrow_line, {}, [styles._v2])} />
        <div className={classNames(styles.arrow_line, {}, [styles._v3])} />
      </div>
    </div>
  );
};
