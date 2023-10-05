import { IconType } from 'react-icons';
import { Theme } from 'app/providers/lib/theme-context/ThemeContext';
import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';

export interface IThemeSubItems {
  Icon: IconType;
  text: string;
  theme: Theme;
}

export interface IThemeItems {
  Icon: IconType;
  text: string;
  subItems?: IThemeSubItems[];
}

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
