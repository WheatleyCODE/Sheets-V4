import {
  IUseDefaultEventsOpts,
  IUseDefaultEventsResult,
  IUseDefaultEventsResultData,
  IUseDefaultEventsResultHandlers,
} from '@/shared/lib/hooks';
import { IControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem.interface';
import { HTMLAttributes } from 'react';

export interface IControllableMenuSpecificProps {
  items: IControllableMenuItem[];
  itemsViewCount?: number;
}

export interface IControllableMenuProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      keyof IUseControllableMenuResultHandlers<HTMLDivElement> | keyof IUseControllableMenuResultData
    >,
    IUseControllableMenuResultHandlers<HTMLDivElement>,
    IUseControllableMenuResultData,
    IControllableMenuSpecificProps {
  onSelectItem?: (item: IControllableMenuItem) => void;
}

export interface IUseControllableMenuResultData extends IUseDefaultEventsResultData {
  currentIndex: number;
  changeCurrentIndex: (index: number) => void;
}

export interface IUseControllableMenuResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {}

export interface IUseControllableMenuResult<EL = HTMLDivElement> extends IUseDefaultEventsResult<EL> {
  data: IUseControllableMenuResultData;
  handlers: IUseControllableMenuResultHandlers<EL>;
}

export interface IUseControllableMenuOpts {
  items: IControllableMenuItem[];
  onChangeIndex?: (item: IControllableMenuItem) => void;
}

export interface IUseControllableMenuParams {
  default?: IUseDefaultEventsOpts<HTMLDivElement>;
  controllableMenu?: IUseControllableMenuOpts;
}

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
