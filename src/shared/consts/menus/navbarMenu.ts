import { RoutesPath } from 'shared/config/route-config/routeConfig';

export interface INavbarMenuItem {
  text: string;
  path: string;
}

export const navbarMenu: INavbarMenuItem[] = [
  { text: 'Домашняя страница', path: RoutesPath.home },
  { text: 'Таблицы', path: RoutesPath.sheets },
  { text: 'Лендинг', path: RoutesPath.landing },
];
