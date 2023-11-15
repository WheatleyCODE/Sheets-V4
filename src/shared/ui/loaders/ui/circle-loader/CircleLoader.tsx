import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICircleLoaderProps } from './CircleLoader.interface';
import styles from './CircleLoader.module.scss';

export const CircleLoader: FC<ICircleLoaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div className={styles.circle_loader_container}>
      <div {...anotherProps} data-testid="circleLoader" className={classNames(styles.circle_loader, {}, [className])} />
    </div>
  );
};
