import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPageRowProps } from './PageRow.interface';
import styles from './PageRow.module.scss';

export const PageRow: FC<IPageRowProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="pageRow" className={classNames(styles.page_row, {}, [className])}>
      {children}
    </div>
  );
};
