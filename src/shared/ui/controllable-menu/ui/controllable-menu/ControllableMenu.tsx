import { FC } from 'react';
import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from './ControllableMenu.consts';
import { ControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuProps } from './ControllableMenu.interface';
import styles from './ControllableMenu.module.scss';

export const ControllableMenu: FC<IControllableMenuProps> = (props) => {
  const {
    className,
    items,
    menuRef,
    menuState,
    itemsViewCount = 4,
    changeMenuState,
    closeAllSubMenus,
    isScroll = false,
    selectItem,
    selectCurrentItem,
    addCurrentDepthIndex,
    changeKey,
    key,
    side = 'left',
    ...anotherProps
  } = props;

  const maxHeight = itemsViewCount * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING * 2;

  return (
    <div
      {...anotherProps}
      ref={menuRef}
      tabIndex={0}
      data-testid="controllableMenu"
      style={{ maxHeight, paddingTop: CONTROLLABLE_MENU_PADDING, paddingBottom: CONTROLLABLE_MENU_PADDING }}
      className={classNames(styles.controllable_menu, { [styles.scroll]: isScroll }, [className])}
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
