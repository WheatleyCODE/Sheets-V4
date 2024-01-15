import { Border, FontStyles, Fonts, HorizontalAligns, ICell, ICol, IRow, VerticalAligns } from '@/entities/cell';
import { CHARS_MAX_LENGTH, CODES, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../model/consts/sheetsTable.consts';
import { ISheetsTable } from '../../model/types/sheetsTable.interface';

export const createColData = (value: string, id: number): ICol => {
  return {
    id,
    value,
    width: DEFAULT_WIDTH,
  };
};

export const createRowData = (value: number): IRow => {
  return {
    value: String(value),
    id: value,
    height: DEFAULT_HEIGHT,
  };
};

export const createCellData = (id: string): ICell => {
  return {
    id,
    value: '',
    font: Fonts.ARIAL,
    fontSize: '10',
    fontStyle: FontStyles.BOLD,
    textColor: 'black',
    backgroundColor: 'white',
    border: Border.CLEAR,
    verticalAlign: VerticalAligns.TOP,
    horizontalAlign: HorizontalAligns.LEFT,
  };
};

export const toCharCode = (): (() => string) => {
  let count = -1;
  let repeat = 1;

  return () => {
    count++;

    if (count > CHARS_MAX_LENGTH) {
      repeat++;
      count = 0;
    }

    return String.fromCharCode(CODES.A + count).repeat(repeat);
  };
};

export const createCols = (colsCount: number): ICol[] => {
  const toChar = toCharCode();
  return new Array(colsCount).fill('').map((_, i) => createColData(toChar(), i + 1));
};

export const createRows = (rowsCount: number): IRow[] => {
  return new Array(rowsCount).fill('').map((_, i) => createRowData(i + 1));
};

export const createCells = (rows: IRow[], colsCount: number): ICell[][] => {
  const cells: ICell[][] = [];

  for (let i = 0; i < rows.length; i++) {
    cells[i] = [];

    for (let j = 0; j < colsCount; j++) {
      cells[i].push(createCellData(`${i}:${j}`));
    }
  }

  return cells;
};

export const createTable = (colsCount = 30, rowsCount = 50): ISheetsTable => {
  const cols = createCols(colsCount);
  const rows = createRows(rowsCount);
  const cells = createCells(rows, colsCount);

  return {
    cols,
    rows,
    cells,
    id: 'v4()',
  };
};
