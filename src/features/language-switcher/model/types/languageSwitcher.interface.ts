import { IconType } from 'react-icons';
import { UILanguages } from '../consts/languageSwitcher.consts';

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
