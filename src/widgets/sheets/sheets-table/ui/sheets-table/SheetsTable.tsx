import { FC, memo, useEffect } from 'react';
import { useTableScroll } from './SheetsTable.hooks';
import { Cell, CellAll, CellCol, CellRow } from '@/entities/cell';
import { useSheetsTable } from '../../model/selectors/get-sheets-table/getSheetsTable';
import { sheetsTableReducer, useSheetsTableActions } from '../../model/slice/sheetsTableSlice';
import { ReducersList, useDynamicModule, useTypedDispatch } from '@/shared/lib/hooks';
import { createTable } from './SheetsTable.heplers';
import type { ISheetsTableProps } from './SheetsTable.interface';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsTable.module.scss';

const reducers: ReducersList = { sheetsTable: sheetsTableReducer };

export const SheetsTable: FC<ISheetsTableProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const table = useSheetsTable();
  const dispatch = useTypedDispatch();
  const { setSheetsTable } = useSheetsTableActions();
  const { refBarBottom, refBarRight, refCellCols, refCellRows, refCells } = useTableScroll();

  useEffect(() => {
    dispatch(setSheetsTable(createTable()));
  }, [dispatch, setSheetsTable]);

  return (
    <div {...anotherProps} data-testid="sheetsTable" className={classNames(styles.sheets_table, {}, [className])}>
      <div className={styles.table_header}>
        <CellAll />
        <div ref={refCellCols} className={styles.cell_cols}>
          {table?.cols.map(({ id, value, width }) => <CellCol key={id} id={id} value={value} width={width} />)}
        </div>
      </div>

      <div className={styles.table}>
        <div ref={refCellRows} className={styles.cell_rows}>
          {table?.rows.map(({ id, value, height }) => <CellRow key={id} id={id} value={value} height={height} />)}
        </div>

        <div className={styles.right_scroll}>
          <div ref={refBarRight} className={styles.right_bar} />
        </div>

        <div className={styles.bottom_scroll}>
          <div ref={refBarBottom} className={styles.bottom_bar} />
        </div>

        <div ref={refCells} className={styles.cells}>
          {table?.cells.map((cells, i) => {
            return (
              <div key={i} className={styles.row}>
                {cells.map((cell) => (
                  <Cell key={cell.id} id={cell.id} value={cell.value} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
