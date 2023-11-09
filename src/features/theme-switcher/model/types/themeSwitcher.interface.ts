import { Theme } from 'app/providers/lib';
import { IconType } from 'react-icons';

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
