import { FC, memo } from 'react';
import { Icon as IconComponent } from '../../../icon';
import { INPUT_OPTIONS_MENU_ITEM_HEIGHT } from './InputOptionsMenuItem.consts';
import { classNames } from 'shared/lib/class-names';
import type { IInputOptionsMenuItemProps } from './InputOptionsMenuItem.interface';
import styles from './InputOptionsMenuItem.module.scss';

export const InputOptionsMenuItem: FC<IInputOptionsMenuItemProps> = memo((props) => {
  const { className, item, onClick, style, ...anotherProps } = props;
  const { text, Icon } = item;

  const onClickHandler = () => {
    onClick(text);
  };

  return (
    <div
      {...anotherProps}
      data-testid="inputOptionsMenuItem"
      style={{ ...style, height: INPUT_OPTIONS_MENU_ITEM_HEIGHT }}
      onMouseDown={onClickHandler}
      className={classNames(styles.item, { [styles.icon]: !!Icon }, [className])}
    >
      {!!Icon && (
        <div data-testid="inputOptionsMenuItem-icon" className={styles.icon_container}>
          <IconComponent Icon={Icon} className={styles.icon} />
        </div>
      )}
      {text}
    </div>
  );
});
