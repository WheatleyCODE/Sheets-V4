import { FocusEvent, MouseEvent } from 'react';

export interface IUseDefaultEventsOpts<EL = HTMLElement> {
  onFocus?: (e: FocusEvent<EL>) => void;
  onBlur?: (e: FocusEvent<EL>) => void;
  onMouseDown?: (e: MouseEvent<EL>) => void;
  onMouseUp?: (e: MouseEvent<EL>) => void;
  onMouseEnter?: (e: MouseEvent<EL>) => void;
  onMouseLeave?: (e: MouseEvent<EL>) => void;
}

export interface IUseDefaultEventsResultData {
  isFocus: boolean;
  changeIsFocus: (boolean: boolean) => void;
  isTouched: boolean;
  changeIsTouched: (boolean: boolean) => void;
  isMouseDown: boolean;
  changeIsMouseDown: (boolean: boolean) => void;
  isHover: boolean;
  changeIsHover: (boolean: boolean) => void;
}

export interface IUseDefaultEventsResultHandlers<EL> {
  onFocus: (e: FocusEvent<EL, Element>) => void;
  onBlur: (e: FocusEvent<EL, Element>) => void;
  onMouseDown: (e: MouseEvent<EL, globalThis.MouseEvent>) => void;
  onMouseUp: (e: MouseEvent<EL, globalThis.MouseEvent>) => void;
  onMouseEnter: (e: MouseEvent<EL, globalThis.MouseEvent>) => void;
  onMouseLeave: (e: MouseEvent<EL, globalThis.MouseEvent>) => void;
}

export interface IUseDefaultEventsResult<EL> {
  data: IUseDefaultEventsResultData;
  handlers: IUseDefaultEventsResultHandlers<EL>;
}
