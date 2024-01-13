import { FC, memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import { Cell, CellAll, CellCol, CellRow } from '@/entities/cell';
import { getClientXY, onStream } from '@/shared/lib/iterators';
import type { ISheetsTableProps } from './SheetsTable.interface';
import styles from './SheetsTable.module.scss';

export const SheetsTable: FC<ISheetsTableProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const refBarRight = useRef<HTMLDivElement | null>(null);
  const refBarBottom = useRef<HTMLDivElement | null>(null);
  const refCellCols = useRef<HTMLDivElement | null>(null);
  const refCellRows = useRef<HTMLDivElement | null>(null);
  const refCells = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const rightBar = refBarRight.current;
    const bottomBar = refBarBottom.current;
    const cols = refCellCols.current;
    const rows = refCellRows.current;
    const cells = refCells.current;

    if (!rightBar || !bottomBar || !cols || !cells || !rows) return;

    let isBottom = false;
    let startX = 0;
    let endX = 0;

    let isRight = false;
    let startY = 0;
    let endY = 0;

    const streamMMBody = onStream<MouseEvent>(document.body, 'mousemove')
      .enumerate()
      .filter(([_, n]) => n % 4 === 0)
      .map((arr) => getClientXY(arr[0]));

    streamMMBody.run(streamMMBody);
    let bodyMMUnsub = () => {};

    const streamMDBottomBar = onStream<MouseEvent>(bottomBar, 'mousedown')
      .forEach((e) => e.preventDefault())
      .map(getClientXY);
    const streamMDBottomBarUnsub = streamMDBottomBar.subscribe(({ clientX }) => {
      startX = clientX;
      isBottom = true;

      bodyMMUnsub = streamMMBody.subscribe(({ clientX }) => {
        cols.scrollLeft = clientX - startX + endX;
        cells.scrollLeft = clientX - startX + endX;

        if (clientX - startX + endX <= 0) {
          bottomBar.style.left = '0px';
          return;
        }

        bottomBar.style.left = `${clientX - startX + endX}px`;
      });
    });

    streamMDBottomBar.run(streamMDBottomBar);

    const streamMDRightBar = onStream<MouseEvent>(rightBar, 'mousedown')
      .forEach((e) => e.preventDefault())
      .map(getClientXY);

    streamMDRightBar.subscribe(({ clientY }) => {
      startY = clientY;
      isRight = true;

      bodyMMUnsub = streamMMBody.subscribe(({ clientY }) => {
        cells.scrollTop = clientY - startY + endY;
        rows.scrollTop = clientY - startY + endY;

        if (clientY - startY + endY <= 0) {
          rightBar.style.top = '0px';
          return;
        }

        rightBar.style.top = `${clientY - startY + endY}px`;
      });
    });
    streamMDRightBar.run(streamMDRightBar);

    const streamMUBody = onStream<MouseEvent>(document.body, 'mouseup').map(getClientXY);
    const streamMUBodyUnsub = streamMUBody.subscribe(({ clientX, clientY }) => {
      if (isBottom) {
        endX = clientX - startX + endX;
        isBottom = false;
      }

      if (isRight) {
        endY = clientY - startY + endY;
        isRight = false;
      }

      bodyMMUnsub();
    });
    streamMUBody.run(streamMUBody);

    const streamMOBody = onStream<MouseEvent>(document.body, 'mouseleave').map(getClientXY);
    streamMOBody.subscribe(({ clientX, clientY }) => {
      if (isBottom) {
        endX = clientX - startX + endX;
        isBottom = false;
      }

      if (isRight) {
        endY = clientY - startY + endY;
        isRight = false;
      }

      bodyMMUnsub();
    });
    streamMOBody.run(streamMOBody);

    const streamScrollBody = onStream<WheelEvent>(document.body, 'mousewheel');
    streamScrollBody.subscribe((e) => {
      const deltaY = e.deltaY / 5;

      cells.scrollTop = endY + deltaY;
      rows.scrollTop = endY + deltaY;

      if (endY + deltaY <= 0) {
        rightBar.style.top = '0px';
        return;
      }

      rightBar.style.top = `${endY + deltaY}px`;

      endY += deltaY;
    });
    streamScrollBody.run(streamScrollBody);

    return () => {
      streamMDBottomBarUnsub();
      streamMUBodyUnsub();
      bodyMMUnsub();
    };
  }, []);

  return (
    <div {...anotherProps} data-testid="sheetsTable" className={classNames(styles.sheets_table, {}, [className])}>
      <div className={styles.table_header}>
        <CellAll />
        <div ref={refCellCols} className={styles.cell_cols}>
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
          <CellCol />
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.right_scroll}>
          <div ref={refBarRight} className={styles.right_bar} />
        </div>
        <div className={styles.bottom_scroll}>
          <div ref={refBarBottom} className={styles.bottom_bar} />
        </div>

        <div ref={refCellRows} className={styles.cell_rows}>
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
        </div>

        <div ref={refCells} className={styles.cells}>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
          <div className={styles.row}>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </div>
        </div>
      </div>
    </div>
  );
});
