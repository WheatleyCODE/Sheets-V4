import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICellRowProps } from './CellRow.interface';
import styles from './CellRow.module.scss';

export const CellRow: FC<ICellRowProps> = memo((props) => {
  const { className, value, id, height, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="cellRow" className={classNames(styles.cell_row, {}, [className])}>
      {value}
    </div>
  );
});
