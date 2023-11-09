import { CSSProperties } from 'react';

export interface IInputOptionsMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  maxItems?: number;
  style?: CSSProperties;
}
