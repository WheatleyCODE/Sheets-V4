import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuProps } from './ControllableMenu.interface';
import styles from './ControllableMenu.module.scss';
import { intoIter } from '@/shared/lib/iterators';
import { ControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem';
import type { IControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem.interface';
import { extractUseControllableMenuProps } from './ControllableMenu.hooks';

export const ControllableMenu: FC<IControllableMenuProps> = (props) => {
  const [props1, data, handlers] = extractUseControllableMenuProps(props);
  const { className, items, ...anotherProps } = props1;
  const { changeCurrentIndex, currentIndex } = data;

  const itemsJsx = intoIter<IControllableMenuItem>(items)
    .enumerate()
    .map(([item, i]) => (
      <ControllableMenuItem
        changeCurrentIndex={changeCurrentIndex}
        isActive={i === currentIndex}
        key={item.text}
        item={item}
      />
    ))
    .toArray();

  return (
    <div
      {...anotherProps}
      {...handlers}
      data-testid="controllableMenu"
      className={classNames(styles.controllable_menu, {}, [className])}
    >
      {itemsJsx}
    </div>
  );
};
