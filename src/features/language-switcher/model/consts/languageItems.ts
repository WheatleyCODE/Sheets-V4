import { IconType } from 'react-icons';
import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';

export enum UILanguages {
  RU = 'ru',
  EN = 'en',
  FR = 'fr',
}

export interface ILanguagesSubItems {
  Icon: IconType;
  text: string;
  uiLang: UILanguages;
}

export interface ILanguagesItems {
  Icon: IconType;
  text: string;
  subItems?: ILanguagesSubItems[];
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
