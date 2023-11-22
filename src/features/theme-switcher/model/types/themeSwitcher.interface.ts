import { IconType } from 'react-icons';
import { Theme } from '@/shared/lib/contexts';

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
