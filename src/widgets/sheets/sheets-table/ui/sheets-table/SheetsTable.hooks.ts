import { getClientXY, onStream } from '@/shared/lib/iterators';
import { useEffect, useRef } from 'react';

export const useTableScroll = () => {
  const refBarRight = useRef<HTMLDivElement | null>(null);
  const refBarBottom = useRef<HTMLDivElement | null>(null);
  const refCellCols = useRef<HTMLDivElement | null>(null);
  const refCellRows = useRef<HTMLDivElement | null>(null);
  const refCells = useRef<HTMLDivElement | null>(null);

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

  return {
    refBarRight,
    refBarBottom,
    refCellCols,
    refCellRows,
    refCells,
  };
};
