import { IconType } from 'react-icons';
import type { UseControllableMenuResult } from './ControllableMenu.hooks';
import { IUseKeydownResult } from '@/shared/lib/hooks/hooks-for-builder';

export interface IControllableMenuItem {
  Icon?: IconType;
  text: string;
  value: string;
  childrenItems?: IControllableMenuItem[];
}

export interface IControllableMenuSpecificProps {
  itemsViewCount?: number;
  side?: 'left' | 'right';
  isScroll?: boolean;
}

type ControllableMenuData = UseControllableMenuResult['data'];
type ControllableMenuDataChangers = UseControllableMenuResult['dataChangers'];
type ControllableMenuEventHandlers = UseControllableMenuResult['eventHandlers'];
type ControllableMenuRef = UseControllableMenuResult['ref'];

export interface IControllableMenuProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof ControllableMenuData | keyof ControllableMenuDataChangers | keyof ControllableMenuEventHandlers
    >,
    ControllableMenuData,
    ControllableMenuDataChangers,
    ControllableMenuEventHandlers,
    IControllableMenuSpecificProps {
  menuRef: ControllableMenuRef;
}

export type DepthState = { index: number; next?: DepthState };

export type UseControllableMenuParams = {
  items?: IControllableMenuItem[];
  initActiveIndex?: number;
  onSelectItem?: (item: IControllableMenuItem) => void;
  onChangeCurrentIndex?: () => void;
  isHorizontalReverse?: boolean;
  isDisableKeydown?: boolean;
  isScrollControl?: boolean;
};

export type UseControllableMenuMergedTypes = [IUseKeydownResult];
