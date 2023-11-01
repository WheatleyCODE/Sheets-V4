import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Text } from '../../../text';
import styles from './ImageLoad.module.scss';

interface IImageLoadProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const ImageLoad: FC<IImageLoadProps> = (props) => {
  const { className, text = 'Загрузка...', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="imageLoad" className={classNames(styles.image_load, {}, [className])}>
      <Text text={text} />
    </div>
  );
};
