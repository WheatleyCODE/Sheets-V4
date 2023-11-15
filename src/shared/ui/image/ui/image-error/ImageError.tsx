import { FC } from 'react';
import { Text } from '../../../text';
import { classNames } from '@/shared/lib/class-names';
import type { IImageErrorProps } from './ImageError.interface';
import styles from './ImageError.module.scss';

export const ImageError: FC<IImageErrorProps> = (props) => {
  const { className, text = 'Ошибка при загрузке картинки =(', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageError" className={classNames(styles.image_error, {}, [className])}>
      <Text textStyle="error" text={text} />
    </div>
  );
};
