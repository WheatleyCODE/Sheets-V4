import type { IInputOptionsMenuItem } from '../input-options-menu-item/InputOptionsMenuItem.interface';

export const getNumbers = () => {
  const numbers: IInputOptionsMenuItem[] = [];

  for (let index = 1; index <= 100; index++) {
    numbers.push({ text: String(index) });
  }

  return numbers;
};
