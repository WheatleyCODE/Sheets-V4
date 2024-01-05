import { FC, useCallback, useEffect } from 'react';
import { Icon as IconComponent } from '../../../icon';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuItemProps } from './ControllableMenuItem.interface';
import styles from './ControllableMenuItem.module.scss';
import { useDelayHover } from '@/shared/lib/hooks/hooks-for-builder';
import { IControllableMenuItem } from '../controllable-menu/ControllableMenu.interface';
import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from '../controllable-menu/ControllableMenu.consts';

export const ControllableMenuItem: FC<IControllableMenuItemProps> = (props) => {
  const { className, item, isActive, depth, index, changeMenuState, menuState, ...anotherProps } = props;
  const { Icon, text } = item;

  const onMouseEnterStart = useCallback(() => {
    console.log(index, depth);

    changeMenuState(index, depth);
  }, [changeMenuState, depth, index]);

  const onMouseEnterEnd = useCallback(() => {
    changeMenuState(0, depth + 1);
  }, [changeMenuState, depth]);

  // ! FIX {} as any
  const { data, dataChangers, eventHandlers } = useDelayHover({} as any, {
    onMouseEnterEnd,
    onMouseEnterStart,
  });

  const menuJsx = () => {
    const height = 3 * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING * 2 - CONTROLLABLE_MENU_PADDING;

    const to = (items: IControllableMenuItem[]) => {
      let activeIndex = menuState.next?.index;

      if (depth === 1) {
        activeIndex = menuState.next?.next?.index;
      }

      return (
        <div style={{ height }} className={styles.menu}>
          {items.map((item, i) => (
            <ControllableMenuItem
              item={item}
              index={i}
              changeMenuState={changeMenuState}
              depth={depth + 1}
              menuState={menuState}
              isActive={i === activeIndex}
            />
          ))}
        </div>
      );
    };

    if (depth === 0) {
      if (menuState?.next && item.childrenItems) {
        return to(item.childrenItems);
      }
    }

    if (depth === 1) {
      if (menuState?.next?.next && item.childrenItems) {
        console.log('work', depth);
        return to(item.childrenItems);
      }
    }
  };

  return (
    <div
      {...anotherProps}
      {...eventHandlers}
      data-testid="controllableMenuItem"
      className={classNames(styles.controllable_menu_item, { [styles.active]: isActive }, [className])}
    >
      {!!Icon && (
        <div data-testid="controllableMenuItem-icon" className={styles.icon_container}>
          <IconComponent Icon={Icon} className={styles.icon} />
        </div>
      )}

      {JSON.stringify(data)}

      <div className={styles.text}>{text}</div>

      {menuJsx()}
    </div>
  );
};
