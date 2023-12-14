import { MouseEvent } from 'react';

export interface IUseClickResult<T> {
  data: {
    isMouseDown: boolean;
  };

  dataChangers: {
    changeIsMouseDown: (boolean: boolean) => void;
  };

  eventHandlers: {
    onMouseDown: (e: MouseEvent<T>) => void;
    onMouseUp: (e: MouseEvent<T>) => void;
    onClick?: (e: MouseEvent<T>) => void;
    onContextMenu?: (e: MouseEvent<T>) => void;
  };
}

export interface IUseClickParams<T extends HTMLElement> {
  onChangeIsMouseDown?: (boolean: boolean) => void;
  onMouseDown?: (e: MouseEvent<T>) => void;
  onMouseUp?: (e: MouseEvent<T>) => void;
  onClick?: (e: MouseEvent<T>) => void;
  onContextMenu?: (e: MouseEvent<T>) => void;
}
