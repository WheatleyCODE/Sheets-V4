import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import type { IWidthProps } from './Width.interface';
import styles from './Width.module.scss';

export const Width: FC<IWidthProps> = (props) => {
  const { className, children, maxWidth = 'default', ...anotherProps } = props;

  return (
    <div data-testid="width" {...anotherProps} className={classNames(styles.width, {}, [className, styles[maxWidth]])}>
      {children}
    </div>
  );
};
