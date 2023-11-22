import { createSelector } from '@reduxjs/toolkit';
import { getUser, IUser, UserRoles } from '@/entities/user';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineHome,
  MdOutlinePersonPin,
  MdOutlinePostAdd,
  MdOutlineViewCompact,
  MdOutlineViewCompactAlt,
  MdOutlineWeb,
} from 'react-icons/md';
import type { INavigationMenuItem } from '../../types/navigationMenu.interface';
import {
  getRouteAdminPanel,
  getRouteHome,
  getRouteLanding,
  getRouteProfile,
  getRouteSheets,
  getRouteTemplateCreate,
  getRouteTemplates,
} from '@/shared/config/route-config/routeConfig';

const isRoleAdmin = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.ADMIN));
const isRoleDeveloper = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.DEVELOPER));

export const getNavigationItems = createSelector(getUser, (user) => {
  const items: INavigationMenuItem[] = [
    { text: 'Домашняя страница', path: getRouteHome(), Icon: MdOutlineHome },
    { text: 'Таблицы', path: getRouteSheets(), Icon: MdOutlineViewCompact },
    { text: 'Лендинг', path: getRouteLanding(), Icon: MdOutlineWeb },
  ];

  if (user) {
    items.push({
      text: 'Профиль',
      path: getRouteProfile(user.id),
      Icon: MdOutlinePersonPin,
      authOnly: true,
    });
    items.push({ text: 'Шаблоны', path: getRouteTemplates(), Icon: MdOutlineViewCompactAlt, authOnly: true });
    items.push({
      text: 'Создать шаблон',
      path: getRouteTemplateCreate(),
      Icon: MdOutlinePostAdd,
      authOnly: true,
    });
  }

  if (user && (isRoleAdmin(user) || isRoleDeveloper(user))) {
    items.push({
      text: 'Админ панель',
      path: getRouteAdminPanel(),
      Icon: MdOutlineAdminPanelSettings,
      authOnly: true,
    });
  }

  return items;
});
