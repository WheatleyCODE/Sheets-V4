import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuItem, IControllableMenuProps } from './ControllableMenu.interface';
import styles from './ControllableMenu.module.scss';

import { intoIter } from '@/shared/lib/iterators';
import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from './ControllableMenu.consts';
import { ControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem';

export const ControllableMenu: FC<IControllableMenuProps> = (props) => {
  const {
    className,
    items,
    menuRef,
    menuState,
    itemsViewCount = 4,
    changeMenuState,
    addCurrentDepthIndex,
    ...anotherProps
  } = props;

  // const itemsJsx = intoIter<IControllableMenuItem>(items)
  //   .enumerate()
  //   .map(([item, i]) => (
  //     <ControllableMenuItem
  //       index={i}
  //       isActive={i === activeIndex}
  //       changeActiveIndex={changeActiveIndex}
  //       key={item.text}
  //       item={item}
  //     />
  //   ))
  //   .toArray();

  const maxHeight =
    itemsViewCount * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING * 2 - CONTROLLABLE_MENU_PADDING;

  return (
    <div
      {...anotherProps}
      ref={menuRef}
      tabIndex={0}
      data-testid="controllableMenu"
      style={{ maxHeight, paddingTop: CONTROLLABLE_MENU_PADDING, paddingBottom: CONTROLLABLE_MENU_PADDING }}
      className={classNames(styles.controllable_menu, {}, [className])}
    >
      {items.map((item, i) => {
        return (
          <ControllableMenuItem
            index={i}
            depth={0}
            menuState={menuState}
            isActive={i === menuState.index}
            changeMenuState={changeMenuState}
            key={item.text}
            item={item}
          />
        );
      })}
    </div>
  );
};
