import { IInputOptionsMenuItem } from '../ui/input-options-menu-item/InputOptionsMenuItem';

export enum DefaultItems {
  NUMBERS = 'numbers',
}

const getNumbers = () => {
  const numbers: IInputOptionsMenuItem[] = [];

  for (let index = 1; index <= 100; index++) {
    numbers.push({ text: String(index) });
  }

  return numbers;
};

export const defaultItems: Record<DefaultItems, IInputOptionsMenuItem[]> = {
  [DefaultItems.NUMBERS]: getNumbers(),
};
