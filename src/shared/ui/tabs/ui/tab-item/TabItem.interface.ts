import { ReactNode } from 'react';

export interface ITabItem {
  value: string;
  children: ReactNode;
  itemId: string | number;
}

export interface ITabItemProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  value: T;
  children: ReactNode;
  itemId: string | number;
  onSelectItem?: (value: T) => void;
}
