import type { IDragLineItem } from '../drag-line-item/DragLineItem.interface';

export interface IDragLineProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: IDragLineItem[];
}
