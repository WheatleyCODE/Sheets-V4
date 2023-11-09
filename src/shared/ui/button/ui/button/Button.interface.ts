import { IconType } from 'react-icons';
import { ButtonColor, ButtonSize, ButtonStyles } from './Button.consts';

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
