import { FC, useCallback } from 'react';
import { Icon as IconComponent } from '../../../icon';
import { classNames } from '@/shared/lib/class-names';
import type { IControllableMenuItemProps } from './ControllableMenuItem.interface';
import styles from './ControllableMenuItem.module.scss';

export const ControllableMenuItem: FC<IControllableMenuItemProps> = (props) => {
  const { className, item, isActive, changeCurrentIndex, ...anotherProps } = props;
  const { Icon, text, index } = item;

  const onMouseEnter = useCallback(() => {
    changeCurrentIndex(index);
  }, [changeCurrentIndex, index]);

  // const onSelect = useCallback(() => {
  //   onItemSelect?.(item);
  // }, [item, onItemSelect]);

  return (
    <div
      {...anotherProps}
      onMouseEnter={onMouseEnter}
      // onMouseDown={onSelect}
      data-testid="controllableMenuItem"
      className={classNames(styles.controllable_menu_item, { [styles.active]: isActive }, [className])}
    >
      {!!Icon && (
        <div data-testid="controllableMenuItem-icon" className={styles.icon_container}>
          <IconComponent Icon={Icon} className={styles.icon} />
        </div>
      )}

      <div className={styles.text}>{text}</div>
    </div>
  );
};
