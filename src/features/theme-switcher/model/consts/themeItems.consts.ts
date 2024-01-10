import {
  MdOutlineBrightnessHigh,
  MdOutlineBrightnessLow,
  MdOutlineBrightnessMedium,
  MdOutlineKeyboardArrowLeft,
  MdOutlineViewKanban,
} from 'react-icons/md';
import { TFunction } from 'i18next';

export const getThemeItems = (t: TFunction) => {
  return [
    { text: t('Настройки'), value: 'Настройки', Icon: MdOutlineViewKanban },
    {
      text: t('Сменить тему'),
      value: 'Сменить тему',
      Icon: MdOutlineKeyboardArrowLeft,
      childrenItems: [
        { text: t('Темная'), value: 'dark', Icon: MdOutlineBrightnessLow },
        { text: t('Светлая'), value: 'light', Icon: MdOutlineBrightnessHigh },
        { text: t('Токсичная'), value: 'toxic', Icon: MdOutlineBrightnessMedium },
      ],
    },
  ];
};
