import { ICell, ICol, IRow } from '@/entities/cell';

export interface IList {
  name: string;
  id: string;
  cols: ICol[];
  rows: IRow[];
  cells: ICell[][];
}

export interface ISettings {
  isOpenTools: boolean;
}

export interface ISheetsState {
  id: string;
  name: string;
  lists: IList[];
  currentListId: string | null;
  createDate: number;
  changeDate: number;
  openDate: number;
  settings: ISettings;
  isLoading: boolean;
}
