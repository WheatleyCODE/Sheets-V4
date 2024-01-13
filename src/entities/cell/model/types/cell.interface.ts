import { Border, FontStyles, Fonts, HorizontalAligns, VerticalAligns } from '../consts/cell.consts';

export interface ICell {
  id: string;
  value: string;
  font: Fonts;
  fontSize: string;
  fontStyle: FontStyles;
  textColor: string;
  backgroundColor: string;
  border: Border;
  verticalAlign: VerticalAligns;
  horizontalAlign: HorizontalAligns;
  formula?: string;
}

export interface ICol {
  id: number;
  value: string;
  width: number;
}

export interface IRow {
  id: number;
  value: string;
  height: number;
}
