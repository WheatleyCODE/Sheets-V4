import { FocusEvent } from 'react';

export interface IUseFocusResult<T> {
  data: {
    isFocus: boolean;
    isTouched: boolean;
  };
  dataChangers: {
    changeIsFocus: (boolean: boolean) => void;
    changeIsTouched: (boolean: boolean) => void;
  };

  eventHandlers: {
    onFocus: (e: FocusEvent<T>) => void;
    onBlur: (e: FocusEvent<T>) => void;
  };
}

export interface IUseFocusParams<T extends HTMLElement> {
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
  onChangeIsFocus?: (boolean: boolean) => void;
  onChangeIsTouched?: (boolean: boolean) => void;
}
