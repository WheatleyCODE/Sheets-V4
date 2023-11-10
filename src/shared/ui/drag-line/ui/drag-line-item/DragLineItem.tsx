import { FC, useEffect } from 'react';
import { ITEM_MARGIN_RIGHT } from './DragLineItem.consts';
import { useDragLine } from '../../lib/DragLineContext.hooks';
import type { IDragLineItemProps } from './DragLineItem.interface';
import { classNames } from '@/shared/lib/class-names';
import styles from './DragLineItem.module.scss';

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
