import { ICell } from '@/entities/cell';

export interface ISheetsToolbar extends Omit<ICell, 'id' | 'value'> {}

export interface ISheetsToolbarSchema {
  sheetsToolbar: ISheetsToolbar;
}
