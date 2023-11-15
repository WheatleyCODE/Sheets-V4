import { IconType } from 'react-icons';

export type ButtonSize = 'big' | 'normal' | 'small';
export type ButtonStyles = 'default' | 'clear';
export type ButtonColor = 'default_color' | 'primary' | 'secondary' | 'danger';
export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon?: IconType;
  disable?: boolean;
  buttonStyle?: ButtonStyles;
  buttonColor?: ButtonColor;
  square?: boolean;
  circle?: boolean;
  buttonSize?: ButtonSize;
}
