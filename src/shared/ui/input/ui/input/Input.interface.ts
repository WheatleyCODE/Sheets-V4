import { IconType } from 'react-icons';
import { UseValidInputResult } from './Input.hooks';

export type InputTypes = 'email' | 'password' | 'text';

export interface IInputSpecificProps {
  Icon?: IconType;
  isReadonly?: boolean;
  type?: InputTypes;
}

// export interface IInputProps<T extends string>
//   extends Omit<
//       HTMLAttributes<HTMLInputElement>,
//       keyof IUseValidInputResultHandlers<HTMLInputElement> | keyof IUseValidInputResultData<string>
//     >,
//     IUseValidInputResultHandlers<HTMLInputElement>,
//     IUseValidInputResultData<T>,
//     IInputSpecificProps {}

type ValidInputData = UseValidInputResult['data'];
type ValidInputDataChangers = UseValidInputResult['dataChangers'];
type ValidInputEventHandlers = UseValidInputResult['eventHandlers'];
type ValidInputRef = UseValidInputResult['ref'];
export interface IInputProps
  extends Omit<
      React.HTMLAttributes<HTMLInputElement>,
      keyof ValidInputData | keyof ValidInputDataChangers | keyof ValidInputEventHandlers
    >,
    ValidInputData,
    ValidInputDataChangers,
    ValidInputEventHandlers,
    IInputSpecificProps {
  ref: ValidInputRef;
}

// export interface IUseValidInputResultData<T> extends IUseDefaultEventsResultData {
//   value: T;
//   changeValue: (value: T) => void;
//   isError: boolean;
//   changeIsError: (boolean: boolean) => void;
//   validError: string | null;
//   changeValidError: (value: string | null) => void;
// }

// export interface IUseValidInputResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {
//   onChange: (e: ChangeEvent<EL>) => void;
// }

// export interface IUseValidInputOpts<T> {
//   initialValue: T;
//   validators?: IValidator[];
// }

// export interface IUseValidInputParams<T> {
//   default?: IUseDefaultEventsOpts<HTMLInputElement>;
//   input?: IUseValidInputOpts<T>;
// }

// export interface IUseValidInputResult<T = string, EL = HTMLInputElement> extends IUseDefaultEventsResult<EL> {
//   data: IUseValidInputResultData<T>;
//   handlers: IUseValidInputResultHandlers<EL>;
// }

// export type IValidator = (str: string) => string | null;

// export type PropsWithoutUseValidInput<P extends object, EL, T extends string> = Omit<
//   P,
//   keyof IUseValidInputResultData<T> | keyof IUseValidInputResultHandlers<EL>
// >;

// export type PropsWithUseValidInput<P extends object, EL, T extends string> = P &
//   IUseValidInputResultData<T> &
//   IUseValidInputResultHandlers<EL>;

// export type ResultWithoutUseValidInput<P extends object, EL, T extends string> = ExtractedProps<
//   PropsWithoutUseValidInput<P, EL, T>,
//   IUseValidInputResultData<T>,
//   IUseValidInputResultHandlers<EL>
// >;
