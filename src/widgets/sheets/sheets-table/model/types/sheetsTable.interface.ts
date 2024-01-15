import { ICell, ICol, IRow } from '@/entities/cell';

export interface ISheetsTable {
  id: string;
  cols: ICol[];
  rows: IRow[];
  cells: ICell[][];
}

export interface ISheetsTableSchema {
  sheetsTable: ISheetsTable;
  selectCells: ICell[];
  currentCell?: ICell;
}
