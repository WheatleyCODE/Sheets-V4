import { KeyboardEvent } from 'react';

export interface IUseKeydownResult {
  data: {
    key: string;
  };

  dataChangers: {
    changeKey: (key: string) => void;
  };

  eventHandlers: {
    onKeyDown: (e: KeyboardEvent) => void;
  };
}

export interface IUseKeydownParams {
  onKeyDown?: (e: KeyboardEvent) => void;
  onChangeKey?: (key: string) => void;
}
