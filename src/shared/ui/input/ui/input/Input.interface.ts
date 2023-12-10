import {
  IUseDefaultEventsResult,
  IUseDefaultEventsResultData,
  IUseDefaultEventsResultHandlers,
} from '@/shared/lib/hooks';
import { ChangeEvent, HTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export type InputTypes = 'email' | 'password' | 'text';
export interface IInputProps<T extends string>
  extends Omit<
      HTMLAttributes<HTMLInputElement>,
      keyof IValidInputResultHandlers<HTMLInputElement> | keyof IValidInputResultData<string>
    >,
    IValidInputResultHandlers<HTMLInputElement>,
    IValidInputResultData<T> {
  Icon?: IconType;
  isReadonly?: boolean;
  type?: InputTypes;
}

export interface IValidInputResultData<T> extends IUseDefaultEventsResultData {
  value: T;
  changeValue: (value: T) => void;
  isError: boolean;
  changeIsError: (boolean: boolean) => void;
  validError: string | null;
  changeValidError: (value: string | null) => void;
}

export interface IValidInputResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {
  onChange: (e: ChangeEvent<EL>) => void;
}

export interface IValidInputResult<T = string, EL = HTMLInputElement> extends IUseDefaultEventsResult<EL> {
  data: IValidInputResultData<T>;
  handlers: IValidInputResultHandlers<EL>;
}

export type IValidator = (str: string) => string | null;
