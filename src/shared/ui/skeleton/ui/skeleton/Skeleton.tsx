import { CSSProperties, FC, memo } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Skeleton.module.scss';

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
}

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
