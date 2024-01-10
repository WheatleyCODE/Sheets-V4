import { TFunction } from 'i18next';
import { MdOutlineAdminPanelSettings, MdOutlineLogout, MdOutlinePersonPin } from 'react-icons/md';

export const getUserItems = (t: TFunction, isAccess: boolean) => {
  const items = [
    { text: t('Профиль'), value: 'Профиль', Icon: MdOutlinePersonPin },
    { text: t('Выйти'), value: 'Выйти', Icon: MdOutlineLogout },
  ];

  if (isAccess) {
    items.unshift({ text: t('Админ панель'), value: 'Админ панель', Icon: MdOutlineAdminPanelSettings });
  }

  return items;
};
