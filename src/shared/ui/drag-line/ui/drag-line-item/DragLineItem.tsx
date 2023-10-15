import { FC, ReactNode, useEffect } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './DragLineItem.module.scss';
import { useDragLine } from '../../lib/useDragLine';

export interface IDragLineItem {
  width: number;
  children: ReactNode;
  itemId: string | number;
}

export const ITEM_MARGIN_RIGHT = 10;

interface IDragLineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  children: ReactNode;
  itemId: string | number;
}

export const DragLineItem: FC<IDragLineItemProps> = (props) => {
  const { className, children, width, style, itemId, ...anotherProps } = props;
  const { addItem, removeItem } = useDragLine();

  useEffect(() => {
    addItem({ width, children, itemId });

    return () => {
      removeItem({ width, children, itemId });
    };
  }, []);

  return (
    <div
      {...anotherProps}
      style={{ ...style, width, marginRight: ITEM_MARGIN_RIGHT }}
      data-testid="dragLineItem"
      className={classNames(styles.drag_line_item, {}, [className])}
    >
      {children}
    </div>
  );
};
