import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ILoaderProps } from './Loader.interface';
import styles from './Loader.module.scss';

export const Loader: FC<ILoaderProps> = memo((props) => {
  const { className, isCenter = false, ...anotherProps } = props;

  return (
    <div data-testid="loader" className={classNames(styles.loader_container, { [styles.center]: isCenter })}>
      <div {...anotherProps} className={classNames(styles.loader, {}, [className])}></div>
    </div>
  );
});
