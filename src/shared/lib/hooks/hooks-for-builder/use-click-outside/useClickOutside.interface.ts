import { MutableRefObject } from 'react';

export interface IUseClickOutsideResult {
  data: {};

  dataChangers: {};

  eventHandlers: {};
}

export interface IUseClickOutsideParams<O = HTMLElement> {
  isClick?: boolean;
  isContextmenu?: boolean;
  handler?: (e: MouseEvent) => void;
  refOut?: MutableRefObject<O | null>;
}
