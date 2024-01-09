import { DepthState } from '../controllable-menu/ControllableMenu.hooks';
import { IControllableMenuItem } from '../controllable-menu/ControllableMenu.interface';

export interface IControllableMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: IControllableMenuItem;
  menuState: DepthState;
  index: number;
  depth: number;
  side: 'left' | 'right';
  changeMenuState: (index: number, depth: number) => void;
  selectItem: (item: IControllableMenuItem) => void;
  isActive: boolean;
}
