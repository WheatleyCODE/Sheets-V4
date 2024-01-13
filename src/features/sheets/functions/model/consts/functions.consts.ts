import { MdFunctions, MdOutlineChevronLeft } from 'react-icons/md';
import { IControllableMenuItem } from '@/shared/ui/controllable-menu';

export const functions: IControllableMenuItem[] = [
  {
    text: 'Все',
    value: 'all',
    Icon: MdOutlineChevronLeft,
    childrenItems: [
      { text: 'Функция 1', value: 'function 1', Icon: MdFunctions },
      { text: 'Функция 2', value: 'function 2', Icon: MdFunctions },
      { text: 'Функция 3', value: 'function 3', Icon: MdFunctions },
      { text: 'Функция 4', value: 'function 4', Icon: MdFunctions },
      { text: 'Функция 5', value: 'function 5', Icon: MdFunctions },
      { text: 'Функция 6', value: 'function 6', Icon: MdFunctions },
      { text: 'Функция 7', value: 'function 7', Icon: MdFunctions },
    ],
  },
  {
    text: 'Функции от SHEETS V4',
    value: 'sheetsV4',
    Icon: MdOutlineChevronLeft,
    childrenItems: [
      {
        text: 'Математические',
        value: 'math',
        Icon: MdOutlineChevronLeft,
        childrenItems: [
          { text: 'Функция 1', value: 'function 1', Icon: MdFunctions },
          { text: 'Функция 2', value: 'function 2', Icon: MdFunctions },
          { text: 'Функция 3', value: 'function 3', Icon: MdFunctions },
        ],
      },
      {
        text: 'Экономические',
        value: 'economy',
        Icon: MdOutlineChevronLeft,
        childrenItems: [
          { text: 'Функция 4', value: 'function 4', Icon: MdFunctions },
          { text: 'Функция 5', value: 'function 5', Icon: MdFunctions },
          { text: 'Функция 6', value: 'function 6', Icon: MdFunctions },
          { text: 'Функция 7', value: 'function 7', Icon: MdFunctions },
        ],
      },
    ],
  },
];
