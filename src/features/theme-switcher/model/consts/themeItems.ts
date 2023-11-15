import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';
import type { IThemeItems } from '../types/themeSwitcher.interface';

export const themeItems: IThemeItems[] = [
  { Icon: MdOutlineViewKanban, text: 'Настройки' },
  {
    Icon: MdOutlineKeyboardArrowLeft,
    text: 'Сменить тему',
    subItems: [
      { Icon: MdOutlineLanguage, text: 'Темная', theme: 'dark' },
      { Icon: MdOutlineLanguage, text: 'Светлая', theme: 'light' },
      { Icon: MdOutlineLanguage, text: 'Токсичная', theme: 'toxic' },
    ],
  },
];
