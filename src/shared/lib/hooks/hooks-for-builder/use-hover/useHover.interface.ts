import { MouseEvent } from 'react';

export interface IUseHoverResult<T> {
  data: {
    isHover: boolean;
  };

  dataChangers: {
    changeIsHover: (boolean: boolean) => void;
  };

  eventHandlers: {
    onMouseEnter: (e: MouseEvent<T>) => void;
    onMouseLeave: (e: MouseEvent<T>) => void;
    onMouseMove?: (e: MouseEvent<T>) => void;
  };
}

export interface IUseHoverParams<T extends HTMLElement> {
  onMouseEnter?: (e: MouseEvent<T>) => void;
  onMouseLeave?: (e: MouseEvent<T>) => void;
  onChangeIsHover?: (boolean: boolean) => void;
  isMouseMove?: boolean;
  onMouseMove?: (e: MouseEvent<T>) => void;
}
