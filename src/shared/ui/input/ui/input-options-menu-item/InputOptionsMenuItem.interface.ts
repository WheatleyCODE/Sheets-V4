import { CSSProperties } from 'react';
import { IconType } from 'react-icons';

export interface IInputOptionsMenuItem {
  Icon?: IconType;
  text: string;
}

export interface IInputOptionsMenuItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  item: IInputOptionsMenuItem;
  onClick: (text: string) => void;
  style?: CSSProperties;
}
