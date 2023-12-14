import { MouseEvent } from 'react';

export interface I{{pascalCase}}Result<T> {
  data: {
    isHover: boolean;
  };

  dataChangers: {
    changeIsHover: (boolean: boolean) => void;
  };

  eventHandlers: {
    onMouseEnter: (e: MouseEvent<T>) => void;
  };
}

export interface I{{pascalCase}}Params<T extends HTMLElement> {
  onMouseEnter?: (e: MouseEvent<T>) => void;
  onChangeIsHover?: (boolean: boolean) => void;
}
