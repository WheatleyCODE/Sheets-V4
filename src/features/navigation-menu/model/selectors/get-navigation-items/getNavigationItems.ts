import { createSelector } from '@reduxjs/toolkit';
import { getUser } from 'entities/user';
import {
  MdOutlineHome,
  MdOutlinePersonPin,
  MdOutlineViewCompact,
  MdOutlineViewCompactAlt,
  MdOutlineWeb,
} from 'react-icons/md';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { INavigationMenuItem } from '../../types/navigation';

export const getNavigationItems = createSelector(getUser, (user) => {
  const items: INavigationMenuItem[] = [
    { text: 'Домашняя страница', path: RoutesPath.home, Icon: MdOutlineHome },
    { text: 'Таблицы', path: RoutesPath.sheets, Icon: MdOutlineViewCompact },
    { text: 'Лендинг', path: RoutesPath.landing, Icon: MdOutlineWeb },
  ];

  if (user) {
    items.push({ text: 'Профиль', path: `${RoutesPath.profile}${user.id}`, Icon: MdOutlinePersonPin, authOnly: true });
    items.push({ text: 'Шаблоны', path: RoutesPath.templates, Icon: MdOutlineViewCompactAlt, authOnly: true });
  }

  return items;
});
