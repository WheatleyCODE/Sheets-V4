import React, { FC, memo } from "react";
import { IconType } from "react-icons";
import styles from "./Button.module.scss";
import { classNames } from "shared/lib/class-names";
import { ButtonStyles } from "./interface";

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon?: IconType;
  disable?: boolean;
  buttonStyle?: ButtonStyles;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const {
    text,
    className,
    Icon,
    buttonStyle = ButtonStyles.DEFAULT,
    disable = false,
    ...anotherProps
  } = props;

  const MemoIcon = Icon && memo(Icon);

  return (
    <button
      className={classNames(styles.button, { disable, icon: !!MemoIcon }, [
        className,
        styles[buttonStyle],
      ])}
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
