import type { INavigationMenuItem } from '../../model/types/navigationMenu.interface';

export interface INavigationMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: INavigationMenuItem;
  onClick: () => void;
}
