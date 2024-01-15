import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICellColProps } from './CellCol.interface';
import styles from './CellCol.module.scss';

export const CellCol: FC<ICellColProps> = memo((props) => {
  const { className, id, value, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="cellCol" className={classNames(styles.cell_col, {}, [className])}>
      {value}
    </div>
  );
});
