import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';
import { Theme } from '@/app/providers/lib';
import type { IThemeItems } from '../types/themeSwitcher.interface';

export const themeItems: IThemeItems[] = [
  { Icon: MdOutlineViewKanban, text: 'Настройки' },
  {
    Icon: MdOutlineKeyboardArrowLeft,
    text: 'Сменить тему',
    subItems: [
      { Icon: MdOutlineLanguage, text: 'Темная', theme: Theme.DARK },
      { Icon: MdOutlineLanguage, text: 'Светлая', theme: Theme.LIGHT },
      { Icon: MdOutlineLanguage, text: 'Токсичная', theme: Theme.TOXIC },
    ],
  },
];
