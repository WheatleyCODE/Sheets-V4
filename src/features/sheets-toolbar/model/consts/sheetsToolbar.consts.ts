import { IControllableMenuItem } from '@/shared/ui/controllable-menu';
import { MdFunctions, MdOutlineFontDownload } from 'react-icons/md';
import {
  MdBorderAll,
  MdBorderBottom,
  MdBorderClear,
  MdBorderLeft,
  MdBorderOuter,
  MdBorderRight,
  MdBorderTop,
} from 'react-icons/md';
import { MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md';
import { MdVerticalAlignBottom, MdVerticalAlignCenter, MdVerticalAlignTop } from 'react-icons/md';
import { MdOutlineChevronLeft } from 'react-icons/md';

export const fontFamilies: IControllableMenuItem[] = [
  { text: 'Arial', value: 'arial', Icon: MdOutlineFontDownload },
  { text: 'Roboto', value: 'Roboto', Icon: MdOutlineFontDownload },
  { text: 'Comfortaa', value: 'Comfortaa', Icon: MdOutlineFontDownload },
  { text: 'Verdana', value: 'Verdana', Icon: MdOutlineFontDownload },
];

export const fontSizes: IControllableMenuItem[] = [
  { text: '6', value: '6' },
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' },
  { text: '14', value: '14' },
  { text: '16', value: '16' },
  { text: '18', value: '18' },
  { text: '24', value: '24' },
  { text: '36', value: '36' },
];

export const borders: IControllableMenuItem[] = [
  { text: 'All', value: 'all', Icon: MdBorderAll },
  { text: 'Outer', value: 'outer', Icon: MdBorderOuter },
  { text: 'Top', value: 'top', Icon: MdBorderTop },
  { text: 'Right', value: 'right', Icon: MdBorderRight },
  { text: 'Bottom', value: 'bottom', Icon: MdBorderBottom },
  { text: 'Left', value: 'left', Icon: MdBorderLeft },
  { text: 'Clear', value: 'clear', Icon: MdBorderClear },
];

export const horAligns: IControllableMenuItem[] = [
  { text: 'Left', value: 'left', Icon: MdFormatAlignLeft },
  { text: 'Center', value: 'center', Icon: MdFormatAlignCenter },
  { text: 'Right', value: 'right', Icon: MdFormatAlignRight },
];

export const verAligns: IControllableMenuItem[] = [
  { text: 'Top', value: 'top', Icon: MdVerticalAlignTop },
  { text: 'Center', value: 'center', Icon: MdVerticalAlignCenter },
  { text: 'Bottom', value: 'bottom', Icon: MdVerticalAlignBottom },
];

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
