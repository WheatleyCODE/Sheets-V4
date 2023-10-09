import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { ButtonColor, ButtonSize, ButtonStyles } from './interface';
import { Icon as IconComponent } from 'shared/ui/icon';
import { classNames } from 'shared/lib/class-names';
import styles from './Button.module.scss';
interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon?: IconType;
  disable?: boolean;
  buttonStyle?: ButtonStyles;
  buttonColor?: ButtonColor;
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
    buttonColor = ButtonColor.DEFAULT,
    disable = false,
    square = false,
    circle = false,
    buttonSize = ButtonSize.NORMAL,
    ...anotherProps
  } = props;

  const mods: Record<string, boolean> = {
    [styles.disable]: disable,
    [styles.square]: square,
    [styles.circle]: circle,
    [styles.icon]: !!Icon,
    [styles.text]: !!text,
  };

  const classesArr = [className, styles[buttonStyle], styles[buttonSize], styles[buttonColor]];

  return (
    <button
      data-testid="button"
      className={classNames(styles.button, mods, classesArr)}
      type="button"
      disabled={disable}
      {...anotherProps}
    >
      {Icon && (
        <div data-testid="button-icon" className={styles.button_icon_container}>
          <IconComponent Icon={Icon} className={styles.button_icon} />
        </div>
      )}
      {text}
    </button>
  );
});
