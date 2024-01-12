import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICellAllProps } from './CellAll.interface';
import styles from './CellAll.module.scss';

export const CellAll: FC<ICellAllProps> = memo((props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="cellAll" className={classNames(styles.cell_all, {}, [className])}>
      All
    </div>
  );
});
