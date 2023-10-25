import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useTabs } from '../../lib/useTabs';
import { getClientXY, onStream, saveCoords } from 'shared/lib/iterators';
import { curry, pipe } from 'shared/lib/fp';
import { classNames } from 'shared/lib/class-names';
import styles from './TabItem.module.scss';
export interface ITabItem {
  value: string;
  children: ReactNode;
  itemId: string | number;
}

export interface ITabItemProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  value: T;
  children: ReactNode;
  itemId: string | number;
  onSelectItem?: (value: T) => void;
}

const coords: { clientX: number; clientY: number } = { clientX: 0, clientY: 0 };

export function TabItem<T extends string>(props: ITabItemProps<T>) {
  const { className, children, value, itemId, onSelectItem, ...anotherProps } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isBreak, setIsBreak] = useState(false);
  const { changeCurrentValue, currentValue, addItem, removeItem } = useTabs();

  useEffect(() => {
    const div = ref.current;
    if (!div) return;

    addItem({ value, children, itemId });

    const strmMouseDown = onStream<MouseEvent>(div, 'mousedown');
    const streamMouseDown = strmMouseDown.map(getClientXY);

    const mouseDownUnsub = streamMouseDown.subscribe(pipe(curry(saveCoords)(coords), () => setIsBreak(false)));
    streamMouseDown.run(streamMouseDown);

    const strmMouseUp = onStream<MouseEvent>(div, 'mouseup');
    const streamMouseUp = strmMouseUp.map(getClientXY);

    const mouseUpUnsub = streamMouseUp.subscribe(({ clientX, clientY }) => {
      let resX = coords.clientX - clientX;
      let resY = coords.clientY - clientY;

      if (resX < 0) resX = resX * -1;
      if (resY < 0) resY = resY * -1;

      if (resX > 30 || resY > 30) {
        setIsBreak(true);
        return;
      }

      setIsBreak(false);
    });

    streamMouseUp.run(streamMouseUp);

    return () => {
      removeItem({ value, children, itemId });
      mouseUpUnsub();
      mouseDownUnsub();
    };
  }, []);

  const onClick = useCallback(() => {
    changeCurrentValue(value);
    onSelectItem?.(value);
  }, [changeCurrentValue, value, onSelectItem]);

  return (
    <div
      {...anotherProps}
      onClick={!isBreak ? onClick : undefined}
      ref={ref}
      data-testid="tabItem"
      className={classNames(styles.tab_item, { [styles.active]: currentValue === value }, [className])}
    >
      {children}
    </div>
  );
}
