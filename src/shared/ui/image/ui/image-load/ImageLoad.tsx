import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { Text } from '../../../text';
import type { IImageLoadProps } from './ImageLoad.interface';
import styles from './ImageLoad.module.scss';

export const ImageLoad: FC<IImageLoadProps> = memo((props) => {
  const { className, text = 'Загрузка...', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageLoad" className={classNames(styles.image_load, {}, [className])}>
      <Text text={text} />
    </div>
  );
});
