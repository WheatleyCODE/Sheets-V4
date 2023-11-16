import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { MdOutlineCalendarMonth, MdOutlineRemoveRedEye, MdOutlineTitle } from 'react-icons/md';
import { IInputOptionsMenuItem } from '@/shared/ui/input';

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

export const sortOrderItems: IInputOptionsMenuItem[] = [
  { text: TemplateSortOrders.ASC, Icon: BsSortUp },
  { text: TemplateSortOrders.DESC, Icon: BsSortDown },
];

export const sortItems: IInputOptionsMenuItem[] = [
  { text: TemplateSortFields.TITLE, Icon: MdOutlineTitle },
  { text: TemplateSortFields.VIEWS, Icon: MdOutlineRemoveRedEye },
  { text: TemplateSortFields.CREATED_AT, Icon: MdOutlineCalendarMonth },
];
