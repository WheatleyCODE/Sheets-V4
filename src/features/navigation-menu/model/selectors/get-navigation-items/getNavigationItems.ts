import { createSelector } from '@reduxjs/toolkit';
import { getUser } from '@/features/user';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineHome,
  MdOutlinePersonPin,
  MdOutlinePostAdd,
  MdOutlineViewCompact,
  MdOutlineViewCompactAlt,
  MdOutlineWeb,
} from 'react-icons/md';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';
import type { INavigationMenuItem } from '../../types/navigationMenu.interface';
import { isRoleAdmin, isRoleDeveloper } from '@/shared/lib/utils';
import { concatURLs } from '@/shared/lib/url';

export const getNavigationItems = createSelector(getUser, (user) => {
  const items: INavigationMenuItem[] = [
    { text: 'Домашняя страница', path: RoutesPath.home, Icon: MdOutlineHome },
    { text: 'Таблицы', path: RoutesPath.sheets, Icon: MdOutlineViewCompact },
    { text: 'Лендинг', path: RoutesPath.landing, Icon: MdOutlineWeb },
  ];

  if (user) {
    items.push({
      text: 'Профиль',
      path: concatURLs(RoutesPath.profile, user.id),
      Icon: MdOutlinePersonPin,
      authOnly: true,
    });
    items.push({ text: 'Шаблоны', path: RoutesPath.templates, Icon: MdOutlineViewCompactAlt, authOnly: true });
    items.push({
      text: 'Создать шаблон',
      path: RoutesPath.template_create,
      Icon: MdOutlinePostAdd,
      authOnly: true,
    });
  }

  if (user && (isRoleAdmin(user) || isRoleDeveloper(user))) {
    items.push({
      text: 'Админ панель',
      path: RoutesPath.admin_panel,
      Icon: MdOutlineAdminPanelSettings,
      authOnly: true,
    });
  }

  return items;
});
