import type { IInputOptionsMenuItem } from '../input-options-menu-item/InputOptionsMenuItem.interface';
import { getNumbers } from './Input.helpers';

export enum DefaultItems {
  NUMBERS = 'numbers',
}

export const defaultItems: Record<DefaultItems, IInputOptionsMenuItem[]> = {
  [DefaultItems.NUMBERS]: getNumbers(),
};
