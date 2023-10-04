import { IconType } from 'react-icons';
import { MdOutlineHome, MdOutlinePersonPin, MdOutlineTableChart, MdOutlineWeb } from 'react-icons/md';
import { RoutesPath } from 'shared/config/route-config/routeConfig';

export interface INavigationMenuItem {
  text: string;
  path: string;
  Icon: IconType;
  authOnly?: boolean;
}

export const navigationMenu: INavigationMenuItem[] = [
  { text: 'Домашняя страница', path: RoutesPath.home, Icon: MdOutlineHome },
  { text: 'Таблицы', path: RoutesPath.sheets, Icon: MdOutlineTableChart },
  { text: 'Лендинг', path: RoutesPath.landing, Icon: MdOutlineWeb },
  { text: 'Профиль', path: RoutesPath.profile, Icon: MdOutlinePersonPin, authOnly: true },
];
