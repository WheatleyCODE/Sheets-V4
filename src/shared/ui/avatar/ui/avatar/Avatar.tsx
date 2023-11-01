import { FC, useMemo } from 'react';
import { Image } from '../../../image';
import { classNames } from 'shared/lib/class-names';
import styles from './Avatar.module.scss';

interface IAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Avatar: FC<IAvatarProps> = (props) => {
  const { className, src, style, width, alt, height, ...anotherProps } = props;

  const memoStyle = useMemo(() => ({ ...style, width, height }), [height, style, width]);

  return (
    <Image
      {...anotherProps}
      data-testid="avatar"
      alt={alt}
      style={memoStyle}
      src={src}
      className={classNames(styles.avatar, {}, [className])}
    />
  );
};
