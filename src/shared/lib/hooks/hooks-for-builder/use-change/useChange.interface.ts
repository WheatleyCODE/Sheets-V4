import { ChangeEvent } from 'react';

export interface IUseChangeResult<T, V extends string> {
  data: {
    value: V;
  };

  dataChangers: {
    changeValue: (value: V) => void;
  };

  eventHandlers: {
    onChange: (e: ChangeEvent<T>) => void;
  };
}

export interface IUseChangeParams<T extends HTMLElement, V extends string> {
  initValue?: V;
  onChange?: (e: ChangeEvent<T>) => void;
  onChangeValue?: (value: V) => void;
}
