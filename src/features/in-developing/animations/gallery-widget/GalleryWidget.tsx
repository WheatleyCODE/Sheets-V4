import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { IGalleryWidgetProps } from './GalleryWidget.interface';
import styles from './GalleryWidget.module.scss';

export const GalleryWidget: FC<IGalleryWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="galleryWidget"
      className={classNames(styles.gallery_widget, {}, [className])}
    >
      <div className={classNames(styles.image, {}, [styles._v1])}>
        <div className={classNames(styles.mountain, {}, [styles._v1])} />
        <div className={classNames(styles.mountain, {}, [styles._v2])} />
      </div>
      <div className={classNames(styles.image, {}, [styles._v2])}>
        <div className={classNames(styles.mountain, {}, [styles._v1])} />
        <div className={classNames(styles.mountain, {}, [styles._v2])} />
      </div>
      <div className={classNames(styles.image, {}, [styles._v3])}>
        <div className={classNames(styles.mountain, {}, [])} />
        <div className={classNames(styles.mountain, {}, [])} />
      </div>
    </motion.div>
  );
};
