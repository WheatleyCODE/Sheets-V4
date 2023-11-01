import { FC } from 'react';
import { Text, TextStyle } from '../../../text';
import { classNames } from 'shared/lib/class-names';
import styles from './ImageError.module.scss';

interface IImageErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const ImageError: FC<IImageErrorProps> = (props) => {
  const { className, text = 'Ошибка при загрузке картинки =(', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageError" className={classNames(styles.image_error, {}, [className])}>
      <Text textStyle={TextStyle.ERROR} text={text} />
    </div>
  );
};
