import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  text: string;
  Icon?: IconType | 'NONE';
  onClick?: () => void;
  side?: 'left' | 'right';
}
