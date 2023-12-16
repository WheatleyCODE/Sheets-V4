import { UIEvent } from 'react';

export interface IUseScrollResult<T> {
  data: {
    scroll: number;
  };

  dataChangers: {
    changeScroll: (num: number) => void;
    addScroll: (num: number) => void;
  };

  eventHandlers: {
    onScroll: (e: UIEvent<T>) => void;
  };
}

export interface IUseScrollParams<T extends HTMLElement> {
  initScroll?: number;
  onChangeScroll?: (num: number) => void;
  onScroll?: (e: UIEvent<T>) => void;
}
