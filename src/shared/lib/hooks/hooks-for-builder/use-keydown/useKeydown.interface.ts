export interface IUseKeydownResult {
  data: {
    key: string;
  };

  dataChangers: {
    changeKey: (key: string) => void;
  };

  eventHandlers: {};
}

export interface IUseKeydownParams {
  target?: 'element' | 'document';
  onKeyDown?: (e: KeyboardEvent) => void;
  onChangeKey?: (key: string) => void;
}
