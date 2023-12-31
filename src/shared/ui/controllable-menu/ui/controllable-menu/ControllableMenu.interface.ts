import { IconType } from 'react-icons';
import { useControllableMenuResult } from './ControllableMenu.hooks';

export interface IControllableMenuItem {
  Icon?: IconType;
  text: string;
  value: string;
  childrenItems?: IControllableMenuItem[];
}

export interface IControllableMenuSpecificProps {
  itemsViewCount?: number;
}

type ControllableMenuData = useControllableMenuResult['data'];
type ControllableMenuDataChangers = useControllableMenuResult['dataChangers'];
type ControllableMenuEventHandlers = useControllableMenuResult['eventHandlers'];
type ControllableMenuRef = useControllableMenuResult['ref'];

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
