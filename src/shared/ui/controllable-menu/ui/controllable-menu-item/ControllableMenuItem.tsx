import { FC, useCallback, useEffect } from 'react';
import { Icon as IconComponent } from '../../../icon';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuItemProps } from './ControllableMenuItem.interface';
import styles from './ControllableMenuItem.module.scss';
import { useDelayHover } from '@/shared/lib/hooks/hooks-for-builder';
import { IControllableMenuItem } from '../controllable-menu/ControllableMenu.interface';

export const ControllableMenuItem: FC<IControllableMenuItemProps> = (props) => {
  const { className, item, isActive, depth, index, changeMenuState, menuState, ...anotherProps } = props;
  const { Icon, text } = item;

  const onMouseEnterStart = useCallback(() => {
    changeMenuState(index, depth);
  }, [changeMenuState, depth, index]);

  const lol = useCallback(() => {
    changeMenuState(0, depth + 1);
  }, [changeMenuState, depth]);

  // const onMouseDown = useCallback(() => {
  //   onSelectItem?.(item);
  // }, [item, onSelectItem]);

  // ! FIX {} as any
  const { data, dataChangers, eventHandlers } = useDelayHover({} as any, {
    onMouseEnterEnd: () => console.log('end'),
    onMouseEnterStart,
  });

  const menuJsx = () => {
    const to = (items: IControllableMenuItem[]) => {
      return (
        <div className={styles.menu}>
          {items.map((item, i) => (
            <ControllableMenuItem
              item={item}
              index={i}
              changeMenuState={changeMenuState}
              depth={depth + 1}
              menuState={menuState}
              isActive={i === menuState.next?.index}
            />
          ))}
        </div>
      );
    };

    if (menuState?.next && item.childrenItems) {
      return to(item.childrenItems);
    }

    if (data.isShow && item.childrenItems) {
      return to(item.childrenItems);
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
