import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IImageWidgetProps } from './ImageWidget.interface';
import styles from './ImageWidget.module.scss';

export const ImageWidget: FC<IImageWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageWidget" className={classNames(styles.image_widget, {}, [className])}>
      ImageWidget 
    </div>
  );
};
