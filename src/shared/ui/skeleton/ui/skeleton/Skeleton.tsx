import { CSSProperties, FC, memo } from 'react';
import { classNames } from 'shared/lib/class-names';
import type { ISkeletonProps } from './Skeleton.interface';
import styles from './Skeleton.module.scss';

export const Skeleton: FC<ISkeletonProps> = memo((props) => {
  const { className, width, height, style, borderRadius, ...anotherProps } = props;

  const css: CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      {...anotherProps}
      style={{ ...style, ...css }}
      data-testid="skeleton"
      className={classNames(styles.skeleton, {}, [className])}
    />
  );
});
