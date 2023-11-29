import { FC, useMemo } from 'react';
import { Image } from '../../../image';
import { classNames } from '@/shared/lib/class-names';
import type { IAvatarProps } from './Avatar.interface';
import styles from './Avatar.module.scss';
import { Skeleton } from '../../../skeleton';

export const Avatar: FC<IAvatarProps> = (props) => {
  const { className, src, style, width, alt, height, ...anotherProps } = props;

  const memoStyle = useMemo(() => ({ ...style, width, height }), [height, style, width]);

  return (
    <Image
      {...anotherProps}
      data-testid="avatar"
      alt={alt}
      style={memoStyle}
      fallback={<Skeleton className={styles.avatar} />}
      errorFallback={<Skeleton className={styles.avatar} />}
      src={src}
      className={classNames(styles.avatar, {}, [className])}
    />
  );
};
