import { FC, MouseEvent, useCallback } from 'react';
import { Icon as IconComponent } from '../../../icon';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuItemProps } from './ControllableMenuItem.interface';
import styles from './ControllableMenuItem.module.scss';
import { useDelayHover } from '@/shared/lib/hooks/hooks-for-builder';
import { IControllableMenuItem } from '../controllable-menu/ControllableMenu.interface';
import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from '../controllable-menu/ControllableMenu.consts';

export const ControllableMenuItem: FC<IControllableMenuItemProps> = (props) => {
  const { className, item, isActive, depth, index, side, changeMenuState, menuState, selectItem, ...anotherProps } =
    props;
  const { Icon, text } = item;

  const onMouseEnterStart = useCallback(() => {
    changeMenuState(index, depth);
  }, [changeMenuState, depth, index]);

  const onMouseEnterEnd = useCallback(() => {
    changeMenuState(0, depth + 1);
  }, [changeMenuState, depth]);

  // ! FIX {} as any
  const { eventHandlers } = useDelayHover({} as any, {
    onMouseEnterEnd,
    onMouseEnterStart,
    time: 500,
    delay: 500,
    refresh: 200,
  });

  const onClickHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      selectItem(item);
    },
    [item, selectItem],
  );

  const menuJsx = () => {
    const to = (items: IControllableMenuItem[]) => {
      let activeIndex = menuState.next?.index;
      const height = items.length * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING * 2;

      if (depth === 1) {
        activeIndex = menuState.next?.next?.index;
      }

      return (
        <div style={{ height }} className={styles.menu}>
          {items.map((item, i) => (
            <ControllableMenuItem
              side={side}
              selectItem={selectItem}
              item={item}
              index={i}
              key={item.value}
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
        return to(item.childrenItems);
      }
    }
  };

  return (
    <div
      {...anotherProps}
      {...eventHandlers}
      onClick={onClickHandler}
      data-testid="controllableMenuItem"
      className={classNames(styles.controllable_menu_item, { [styles.active]: isActive, [styles[side]]: true }, [
        className,
      ])}
    >
      {!!Icon && (
        <div data-testid="controllableMenuItem-icon" className={styles.icon_container}>
          <IconComponent Icon={Icon} className={styles.icon} />
        </div>
      )}

      <div className={styles.text}>{text}</div>

      {menuJsx()}
    </div>
  );
};
