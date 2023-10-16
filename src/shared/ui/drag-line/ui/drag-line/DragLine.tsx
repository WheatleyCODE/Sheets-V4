import { FC } from 'react';
import { motion } from 'framer-motion';
import { intoIter } from 'shared/lib/iterators';
import { DragLineItem, IDragLineItem, ITEM_MARGIN_RIGHT } from '../drag-line-item/DragLineItem';
import { classNames } from 'shared/lib/class-names';
import styles from './DragLine.module.scss';
import { useDragLine } from '../../lib/useDragLine';
import { DragLineProvider } from '../drag-line-provider/DragLineProvider';
import { withProvider } from 'shared/lib/with-provider';

interface IDragLineProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: IDragLineItem[];
}

const DragLineWithoutContext: FC<IDragLineProps> = (props) => {
  const { className, items = [], children, ...anotherProps } = props;
  const { items: contextItems } = useDragLine();

  let trackWidth = 0;

  const itemsArr = intoIter<IDragLineItem>(items)
    .forEach(({ width }) => (trackWidth += width + ITEM_MARGIN_RIGHT))
    .enumerate()
    .map(([item, index]) => <DragLineItem itemId={index} width={item.width} children={item.children} />)
    .toArray();

  const trackWidthContext = contextItems.reduce((acc, item) => acc + item.width + ITEM_MARGIN_RIGHT, 0);

  const leftContext = (trackWidthContext - (contextItems[0]?.width || 0) - ITEM_MARGIN_RIGHT) * -1;
  const leftDefault = ((trackWidth - items[0]?.width || 0) - ITEM_MARGIN_RIGHT) * -1;

  const left = items.length !== 0 ? leftDefault : leftContext;
  const width = items.length !== 0 ? trackWidth : trackWidthContext;

  return (
    <motion.div data-testid="dragLine" className={classNames(styles.drag_line, {}, [className])}>
      <motion.div
        drag="x"
        dragTransition={{ bounceStiffness: 200, bounceDamping: 10, power: 0.3 }}
        dragElastic={0.05}
        dragConstraints={{ left, right: 0 }}
        style={{ width }}
        className={styles.track}
      >
        {children || itemsArr}
      </motion.div>

      <div className={styles.right} />
      <div className={styles.left} />
    </motion.div>
  );
};

export const DragLine: FC<IDragLineProps> = withProvider(DragLineProvider)(DragLineWithoutContext);
