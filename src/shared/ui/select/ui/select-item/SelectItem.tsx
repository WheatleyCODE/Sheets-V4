import { FC, useCallback } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { Icon as IconComponent } from '../../../icon';
import type { ISelectItemProps } from './SelectItem.interface';
import styles from './SelectItem.module.scss';
import { SELECT_MENU_ITEM_HEIGHT } from '../select/Select.consts';

export const SelectItem: FC<ISelectItemProps> = (props) => {
  const { className, item, changeText, ...anotherProps } = props;
  const { Icon, text } = item;

  const onMouseDown = useCallback(() => {
    changeText(text);
  }, [text, changeText]);

  return (
    <div
      {...anotherProps}
      style={{ height: SELECT_MENU_ITEM_HEIGHT }}
      onMouseDown={onMouseDown}
      data-testid="selectItem"
      className={classNames(styles.select_item, { [styles.icon_div]: !!Icon }, [className])}
    >
      {!!Icon && (
        <div data-testid="inputOptionsMenuItem-icon" className={styles.icon_container}>
          <IconComponent Icon={Icon} className={styles.icon} />
        </div>
      )}

      {text}
    </div>
  );
};
