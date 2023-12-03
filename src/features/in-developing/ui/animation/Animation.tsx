import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IAnimationProps } from './Animation.interface';
import styles from './Animation.module.scss';

export const Animation: FC<IAnimationProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="animation" className={classNames(styles.animation, {}, [className])}>
      {children}
    </div>
  );
};
