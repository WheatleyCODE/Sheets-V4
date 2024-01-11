import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { MdOutlineCalendarMonth, MdOutlineRemoveRedEye, MdOutlineTitle } from 'react-icons/md';
import { TFunction } from 'i18next';

export enum TemplateSortFields {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
}

export const INIT_PAGE_COUNT = 1;

export enum TemplateSortOrders {
  ASC = 'asc',
  DESC = 'desc',
}

export const getSortOrderItems = (t: TFunction) => {
  return [
    { text: t('По возрастанию'), Icon: BsSortUp, value: TemplateSortOrders.ASC },
    { text: t('По убыванию'), Icon: BsSortDown, value: TemplateSortOrders.DESC },
  ];
};

export const getSortItems = (t: TFunction) => {
  return [
    { text: t('Заготовок'), Icon: MdOutlineTitle, value: TemplateSortFields.TITLE },
    { text: t('Просмотры'), Icon: MdOutlineRemoveRedEye, value: TemplateSortFields.VIEWS },
    { text: t('Дата создания'), Icon: MdOutlineCalendarMonth, value: TemplateSortFields.CREATED_AT },
  ];
};
