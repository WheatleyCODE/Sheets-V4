import { IconType } from 'react-icons';
import { UseValidInputResult } from './Input.hooks';

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
