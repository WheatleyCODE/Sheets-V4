import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsTableProps } from './SheetsTable.interface';
import { Cell, CellAll, CellCol, CellRow } from '@/entities/cell';
import styles from './SheetsTable.module.scss';

export const SheetsTable: FC<ISheetsTableProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="sheetsTable" className={classNames(styles.sheets_table, {}, [className])}>
      <div className={styles.row}>
        <CellAll />
        <CellCol />
        <CellCol />
        <CellCol />
        <CellCol />
      </div>
      <div className={styles.row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className={styles.row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className={styles.row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
});
