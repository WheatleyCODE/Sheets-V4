import { IconType } from 'react-icons';

export interface IControllableMenuItem {
  Icon?: IconType;
  text: string;
  index: number;
  value?: string;
}

export interface IControllableMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: IControllableMenuItem;
  isActive: boolean;
  onSelectItem?: (item: IControllableMenuItem) => void;
  changeCurrentIndex: (index: number) => void;
}
