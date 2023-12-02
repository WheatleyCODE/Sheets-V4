import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IGalleryWidgetProps } from './GalleryWidget.interface';
import styles from './GalleryWidget.module.scss';

export const GalleryWidget: FC<IGalleryWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="galleryWidget" className={classNames(styles.gallery_widget, {}, [className])}>
      GalleryWidget 
    </div>
  );
};
