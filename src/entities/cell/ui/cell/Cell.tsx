import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICellProps } from './Cell.interface';
import styles from './Cell.module.scss';

export const Cell: FC<ICellProps> = memo((props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="cell" className={classNames(styles.cell, {}, [className])}>
      Cell
    </div>
  );
});
