import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';
import { ILanguagesItems } from '../types/languageSwitcher.interface';

export enum UILanguages {
  RU = 'ru',
  EN = 'en',
  FR = 'fr',
}

export const languageItems: ILanguagesItems[] = [
  { Icon: MdOutlineViewKanban, text: 'Настройки' },
  {
    Icon: MdOutlineKeyboardArrowLeft,
    text: 'Сменить язык',
    subItems: [
      { Icon: MdOutlineLanguage, text: 'Русский', uiLang: UILanguages.RU },
      { Icon: MdOutlineLanguage, text: 'Английский', uiLang: UILanguages.EN },
      { Icon: MdOutlineLanguage, text: 'Французский', uiLang: UILanguages.EN },
    ],
  },
];
