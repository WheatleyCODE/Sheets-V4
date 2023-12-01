import { getUser, IUser, UserRoles } from '@/entities/user';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineHome,
  MdOutlinePersonPin,
  MdOutlinePostAdd,
  MdOutlineViewCompact,
  MdOutlineViewCompactAlt,
} from 'react-icons/md';
import type { INavigationMenuItem } from '../../types/navigationMenu.interface';
import {
  getRouteAdminPanel,
  getRouteHome,
  getRouteProfile,
  getRouteSheets,
  getRouteTemplateCreate,
  getRouteTemplates,
} from '@/shared/config/route-config/routeConfig';
import { createSelector } from '@reduxjs/toolkit';
import { buildSelector } from '@/shared/lib/store';

const isRoleAdmin = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.ADMIN));
const isRoleDeveloper = (user: IUser) => Boolean(user?.roles?.includes(UserRoles.DEVELOPER));

export const [useNavigationItems, getNavigationItems] = buildSelector(
  createSelector(getUser, (user) => {
    const items: INavigationMenuItem[] = [
      { text: 'Домашняя страница', path: getRouteHome(), Icon: MdOutlineHome },
      { text: 'Таблицы', path: getRouteSheets(), Icon: MdOutlineViewCompact },
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
  }),
);
