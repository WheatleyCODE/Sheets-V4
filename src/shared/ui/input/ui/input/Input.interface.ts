import {
  IUseDefaultEventsOpts,
  IUseDefaultEventsResult,
  IUseDefaultEventsResultData,
  IUseDefaultEventsResultHandlers,
} from '@/shared/lib/hooks';
import { ChangeEvent, HTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export type InputTypes = 'email' | 'password' | 'text';

export interface IInputSpecificProps {
  Icon?: IconType;
  isReadonly?: boolean;
  type?: InputTypes;
}
export interface IInputProps<T extends string>
  extends Omit<
      HTMLAttributes<HTMLInputElement>,
      keyof IUseValidInputResultHandlers<HTMLInputElement> | keyof IUseValidInputResultData<string>
    >,
    IUseValidInputResultHandlers<HTMLInputElement>,
    IUseValidInputResultData<T>,
    IInputSpecificProps {}

export interface IUseValidInputResultData<T> extends IUseDefaultEventsResultData {
  value: T;
  changeValue: (value: T) => void;
  isError: boolean;
  changeIsError: (boolean: boolean) => void;
  validError: string | null;
  changeValidError: (value: string | null) => void;
}

export interface IUseValidInputResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {
  onChange: (e: ChangeEvent<EL>) => void;
}

export interface IUseValidInputOpts<T> {
  initialValue: T;
  validators?: IValidator[];
}

export interface IUseValidInputParams<T> {
  default?: IUseDefaultEventsOpts<HTMLInputElement>;
  input?: IUseValidInputOpts<T>;
}

export interface IUseValidInputResult<T = string, EL = HTMLInputElement> extends IUseDefaultEventsResult<EL> {
  data: IUseValidInputResultData<T>;
  handlers: IUseValidInputResultHandlers<EL>;
}

export type IValidator = (str: string) => string | null;

export type PropsWithoutUseValidInput<P extends object, EL, T extends string> = Omit<
  P,
  keyof IUseValidInputResultData<T> | keyof IUseValidInputResultHandlers<EL>
>;

export type PropsWithUseValidInput<P extends object, EL, T extends string> = P &
  IUseValidInputResultData<T> &
  IUseValidInputResultHandlers<EL>;

export type ResultWithoutUseValidInput<P extends object, EL, T extends string> = ExtractedProps<
  PropsWithoutUseValidInput<P, EL, T>,
  IUseValidInputResultData<T>,
  IUseValidInputResultHandlers<EL>
>;
