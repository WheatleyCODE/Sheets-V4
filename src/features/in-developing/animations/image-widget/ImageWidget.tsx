import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { IImageWidgetProps } from './ImageWidget.interface';
import styles from './ImageWidget.module.scss';

export const ImageWidget: FC<IImageWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="imageWidget"
      className={classNames(styles.image_widget, {}, [className])}
    >
      <div className={classNames(styles.image, {}, [])}>
        <div className={classNames(styles.mountain, {}, [styles._v1])} />
        <div className={classNames(styles.mountain, {}, [styles._v2])} />
      </div>

      <div className={classNames(styles.arrow, {}, [])}>
        <div className={classNames(styles.arrow_line, {}, [styles._v1])} />
        <div className={classNames(styles.arrow_line, {}, [styles._v2])} />
        <div className={classNames(styles.arrow_line, {}, [styles._v3])} />
      </div>
    </motion.div>
  );
};
