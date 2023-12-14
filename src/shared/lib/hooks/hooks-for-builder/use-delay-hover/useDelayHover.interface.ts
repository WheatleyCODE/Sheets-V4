import { MouseEvent } from 'react';

export interface IUseDelayHoverResult<T> {
  data: {
    isHover: boolean;
    isMove: boolean;
    isShow: boolean;
  };

  dataChangers: {
    changeIsHover: (boolean: boolean) => void;
    changeIsMove: (boolean: boolean) => void;
  };

  eventHandlers: {
    onMouseEnter: (e: MouseEvent<T>) => void;
    onMouseLeave: (e: MouseEvent<T>) => void;
    onMouseMove: (e: MouseEvent<T>) => void;
  };
}

export interface IUseDelayHoverParams<T extends HTMLElement> {
  time?: number;
  delay?: number;
  refresh?: number;
  onMouseEnter?: (e: MouseEvent<T>) => void;
  onMouseLeave?: (e: MouseEvent<T>) => void;
  onMouseMove?: (e: MouseEvent<T>) => void;
  onChangeIsHover?: (boolean: boolean) => void;
  onChangeIsMove?: (boolean: boolean) => void;
  onChangeIsShow?: (boolean: boolean) => void;
}
