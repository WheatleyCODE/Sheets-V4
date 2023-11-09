import type { ITabItem } from '../tab-item/TabItem.interface';

export interface ITabsProviderProps extends FCProps {
  initItems?: ITabItem[];
  initCurrentValue?: string | null;
}
