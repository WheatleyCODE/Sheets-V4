import type { ITabItem } from '../tab-item/TabItem.interface';

export interface ITabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabItems?: ITabItem[];
  initValue: string | null;
}
