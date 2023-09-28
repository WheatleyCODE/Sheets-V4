import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.scss';
import { classNames } from 'shared/lib/class-names';
import { ButtonSize, ButtonStyles } from './interface';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon?: IconType;
  disable?: boolean;
  buttonStyle?: ButtonStyles;
  square?: boolean;
  circle?: boolean;
  buttonSize?: ButtonSize;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const {
    text,
    className,
    Icon,
    buttonStyle = ButtonStyles.DEFAULT,
    disable = false,
    square = false,
    circle = false,
    buttonSize = ButtonSize.NORMAL,
    ...anotherProps
  } = props;

  const MemoIcon = Icon && memo(Icon);

  const mods: Record<string, boolean> = {
    [styles.disable]: disable,
    [styles.square]: square,
    [styles.circle]: circle,
    [styles.icon]: !!MemoIcon,
    [styles[buttonSize]]: true,
  };

  return (
    <button
      className={classNames(styles.button, mods, [className, styles[buttonStyle]])}
      type="button"
      disabled={disable}
      {...anotherProps}
    >
      {MemoIcon && (
        <div className={styles.button_icon_container}>
          <MemoIcon className={styles.button_icon} />
        </div>
      )}
      {text}
    </button>
  );
});
