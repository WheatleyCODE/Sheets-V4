import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPlatformProps } from './Platform.interface';
import styles from './Platform.module.scss';

export const Platform: FC<IPlatformProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="platform" className={classNames(styles.platform, {}, [className])}>
      {children}
    </div>
  );
};
