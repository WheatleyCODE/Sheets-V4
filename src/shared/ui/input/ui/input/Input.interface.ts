import { IconType } from 'react-icons';
import { UseValidInputResult } from './Input.hooks';
import {
  IUseChangeParams,
  IUseChangeResult,
  IUseClickParams,
  IUseClickResult,
  IUseFocusParams,
  IUseFocusResult,
} from '@/shared/lib/hooks/hooks-for-builder';
import { Validator } from '@/shared/lib/validators';

export type InputTypes = 'email' | 'password' | 'text';

export interface IInputSpecificProps {
  Icon?: IconType;
  isReadonly?: boolean;
  type?: InputTypes;
}

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
  inputRef: ValidInputRef;
}

export type UseValidInputParams<T extends HTMLElement> = {
  useChange?: IUseChangeParams<T, string>;
  useFocus?: IUseFocusParams<T>;
  useClick?: IUseClickParams<T>;

  validators?: Validator[];
  initValue?: string;
};

export type UseValidInputMergedTypes<T, V extends string> = [
  IUseChangeResult<T, V>,
  IUseFocusResult<T>,
  IUseClickResult<T>,
];
