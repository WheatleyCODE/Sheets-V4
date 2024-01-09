import { IconType } from 'react-icons';
import type { UseControllableMenuResult } from './ControllableMenu.hooks';

export interface IControllableMenuItem {
  Icon?: IconType;
  text: string;
  value: string;
  childrenItems?: IControllableMenuItem[];
}

export interface IControllableMenuSpecificProps {
  itemsViewCount?: number;
  side?: 'left' | 'right';
}

type ControllableMenuData = UseControllableMenuResult['data'];
type ControllableMenuDataChangers = UseControllableMenuResult['dataChangers'];
type ControllableMenuEventHandlers = UseControllableMenuResult['eventHandlers'];
type ControllableMenuRef = UseControllableMenuResult['ref'];

export interface IControllableMenuProps
  extends Omit<
      React.HTMLAttributes<HTMLInputElement>,
      keyof ControllableMenuData | keyof ControllableMenuDataChangers | keyof ControllableMenuEventHandlers
    >,
    ControllableMenuData,
    ControllableMenuDataChangers,
    ControllableMenuEventHandlers,
    IControllableMenuSpecificProps {
  menuRef: ControllableMenuRef;
}
