import { ReactNode } from 'react';

export interface IDragLineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  children: ReactNode;
  itemId: string | number;
}

export interface IDragLineItem {
  width: number;
  children: ReactNode;
  itemId: string | number;
}
