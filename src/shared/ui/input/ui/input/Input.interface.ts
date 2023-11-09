import { IconType } from 'react-icons';
import { DefaultItems } from './Input.consts';
import type { IInputOptionsMenuItem } from '../input-options-menu-item/InputOptionsMenuItem.interface';

export interface IInputOptions {
  items: Iterable<IInputOptionsMenuItem> | DefaultItems;
  changeValue: (a?: any) => void;
  maxItems?: number;
  isSearch?: boolean;
  isForbidInput?: boolean;
}

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  Icon?: IconType;
  type: string;
  isError: boolean;
  isActive: boolean;
  validError: string | null;
  isFocus?: boolean;
  isTouched?: boolean;
  isReadonly?: boolean;
  options?: IInputOptions;
}

export interface IValidInputOpts<T> {
  value: T;
  isFocus: boolean;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError: boolean;
  isTouched: boolean;
  validError: string | null;
  changeValue: (string: T) => void;
  changeFocus: (boolean: boolean) => void;
  changeActive: (boolean: boolean) => void;
}

export type IValidator = (str: string) => string | null;
