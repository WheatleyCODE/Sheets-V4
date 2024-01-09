import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuProps } from './ControllableMenu.interface';
import styles from './ControllableMenu.module.scss';

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
    closeAllSubMenus,
    selectItem,
    selectCurrentItem,
    addCurrentDepthIndex,
    changeKey,
    key,
    side = 'left',
    ...anotherProps
  } = props;

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
            side={side}
            index={i}
            depth={0}
            selectItem={selectItem}
            menuState={menuState}
            isActive={i === menuState.index}
            changeMenuState={changeMenuState}
            key={item.value}
            item={item}
          />
        );
      })}
    </div>
  );
};
