import { useCallback, useEffect, useState } from 'react';
import type { IControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem.interface';
import { IUseDefaultEventsOpts, extractUseDefaultEventsProps, useDefaultEvents } from '@/shared/lib/hooks';
import {
  IUseControllableMenuResult,
  IUseControllableMenuResultData,
  IUseControllableMenuResultHandlers,
} from './ControllableMenu.interface';

export type PropsWithoutUseControllableMenu<P extends object, EL> = Omit<
  P,
  keyof IUseControllableMenuResultData | keyof IUseControllableMenuResultHandlers<EL>
>;

export type PropsWithUseControllableMenu<P extends object, EL> = P &
  IUseControllableMenuResultData &
  IUseControllableMenuResultHandlers<EL>;

export type ResultWithoutUseControllableMenu<P extends object, EL> = ExtractedProps<
  PropsWithoutUseControllableMenu<P, EL>,
  IUseControllableMenuResultData,
  IUseControllableMenuResultHandlers<EL>
>;

export interface IUseControllableMenuOpts {
  items: IControllableMenuItem[];
  onChangeIndex?: (item: IControllableMenuItem) => void;
  isRefreshIndex?: boolean;
}

export interface IUseControllableMenuParams {
  default?: IUseDefaultEventsOpts<HTMLDivElement>;
  controllableMenu?: IUseControllableMenuOpts;
}

export const extractUseControllableMenuProps = <P extends object, EL>(
  props: PropsWithUseControllableMenu<P, EL>,
): ResultWithoutUseControllableMenu<P, EL> => {
  const [props1, defData, defHandlers] = extractUseDefaultEventsProps(props);

  const { changeCurrentIndex, currentIndex, ...anotherProps } = props1;

  return [
    anotherProps as PropsWithoutUseControllableMenu<P, EL>,
    { ...defData, changeCurrentIndex, currentIndex },
    { ...defHandlers },
  ];
};

export const useControllableMenu = (params: IUseControllableMenuParams = {}): IUseControllableMenuResult => {
  const { controllableMenu = { items: [] }, default: defEvents } = params;
  const { items, onChangeIndex, isRefreshIndex } = controllableMenu;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, handlers } = useDefaultEvents(defEvents);

  const changeCurrentIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onChangeIndex?.(items[index]);
    },
    [items, onChangeIndex],
  );

  const addCurrentIndex = useCallback(
    (num: number) => {
      setCurrentIndex((p) => {
        if (p + num >= items.length - 1) {
          onChangeIndex?.(items[items.length - 1]);
          return items.length - 1;
        }

        if (p + num <= 0) {
          onChangeIndex?.(items[0]);
          return 0;
        }

        onChangeIndex?.(items[p + num]);
        return p + num;
      });
    },
    [items, onChangeIndex],
  );

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') addCurrentIndex(-1);
      if (e.key === 'ArrowDown') addCurrentIndex(1);
    };

    document.addEventListener('keydown', cb);

    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, [addCurrentIndex, isRefreshIndex]);

  return {
    data: {
      currentIndex,
      changeCurrentIndex,
      ...data,
    },

    handlers: {
      ...handlers,
    },
  };
};
