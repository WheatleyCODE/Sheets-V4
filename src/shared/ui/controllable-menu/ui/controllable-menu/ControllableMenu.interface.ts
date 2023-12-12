import {
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
    IControllableMenuSpecificProps {}

export interface IUseControllableMenuResultData extends IUseDefaultEventsResultData {
  currentIndex: number;
  changeCurrentIndex: (index: number) => void;
}

export interface IUseControllableMenuResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {}

export interface IUseControllableMenuResult<EL = HTMLDivElement> extends IUseDefaultEventsResult<EL> {
  data: IUseControllableMenuResultData;
  handlers: IUseControllableMenuResultHandlers<EL>;
}
