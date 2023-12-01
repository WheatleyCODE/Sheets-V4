import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { MdOutlineCalendarMonth, MdOutlineRemoveRedEye, MdOutlineTitle } from 'react-icons/md';
import { IInputOptionsMenuItem } from '@/shared/ui/input';
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
    { text: t(TemplateSortOrders.ASC), Icon: BsSortUp },
    { text: t(TemplateSortOrders.DESC), Icon: BsSortDown },
  ];
};

export const getSortItems = (t: TFunction) => {
  return [
    { text: t(TemplateSortFields.TITLE), Icon: MdOutlineTitle },
    { text: t(TemplateSortFields.VIEWS), Icon: MdOutlineRemoveRedEye },
    { text: t(TemplateSortFields.CREATED_AT), Icon: MdOutlineCalendarMonth },
  ];
};
