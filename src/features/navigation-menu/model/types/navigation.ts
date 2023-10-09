import { IconType } from 'react-icons';

export interface INavigationMenuItem {
  text: string;
  path: string;
  Icon: IconType;
  authOnly?: boolean;
}
