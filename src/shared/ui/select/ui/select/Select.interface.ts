import { IconType } from 'react-icons';

export interface ISelectItem {
  Icon?: IconType;
  text: string;
  value: string;
}

export interface ISelectProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: IconType;
  items: ISelectItem[];
  itemsViewCount?: number;
  isSearch?: boolean;
  isForbidInput?: boolean;
  isReadonly?: boolean;
}
