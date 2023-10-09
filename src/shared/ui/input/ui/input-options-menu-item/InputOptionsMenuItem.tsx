import { CSSProperties, FC, memo } from 'react';
import { IconType } from 'react-icons';
import { Icon as IconComponent } from 'shared/ui/icon';
import { classNames } from 'shared/lib/class-names';
import styles from './InputOptionsMenuItem.module.scss';

export interface IInputOptionsMenuItem {
  Icon?: IconType;
  text: string;
}

export const INPUT_OPTIONS_MENU_ITEM_HEIGHT = 40;

interface IInputOptionsMenuItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  item: IInputOptionsMenuItem;
  onClick: (text: string) => void;
  style?: CSSProperties;
}

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
