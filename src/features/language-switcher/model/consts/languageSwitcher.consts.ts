import { TFunction } from 'i18next';
import { MdOutlineKeyboardArrowLeft, MdOutlineLanguage, MdOutlineViewKanban } from 'react-icons/md';

export enum UILanguages {
  RU = 'ru',
  EN = 'en',
  FR = 'fr',
}

export const getLanguageItems = (t: TFunction) => {
  return [
    { text: t('Настройки'), value: 'Настройки', Icon: MdOutlineViewKanban },
    {
      text: t('Сменить язык'),
      value: 'Сменить язык',
      Icon: MdOutlineKeyboardArrowLeft,
      childrenItems: [
        { text: t('Русский'), value: UILanguages.RU, Icon: MdOutlineLanguage },
        { text: t('Английский'), value: UILanguages.EN, Icon: MdOutlineLanguage },
        { text: t('Французский'), value: UILanguages.FR, Icon: MdOutlineLanguage },
      ],
    },
  ];
};
