import { Border, FontStyles, Fonts, HorizontalAligns, VerticalAligns } from '@/entities/cell';
import type { ISheetsToolbarSchema } from '../types/sheetsToolbar.interface';

export const initialSheetsToolbarState: ISheetsToolbarSchema = {
  sheetsToolbar: {
    font: Fonts.ARIAL,
    fontSize: '10',
    fontStyle: FontStyles.BOLD,
    textColor: 'black',
    backgroundColor: 'white',
    border: Border.CLEAR,
    verticalAlign: VerticalAligns.TOP,
    horizontalAlign: HorizontalAligns.LEFT,
  },
};
