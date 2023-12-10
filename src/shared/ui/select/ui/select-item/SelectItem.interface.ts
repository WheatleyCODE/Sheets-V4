import type { ISelectItem } from '../select/Select.interface';

export interface ISelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ISelectItem;
  changeText: (text: string) => void;
}
