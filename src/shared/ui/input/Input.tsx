import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import styles from './Input.module.scss';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { classNames } from 'shared/lib/class-names';

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  Icon?: IconType;
  type: string;
  isError: boolean;
  isActive: boolean;
  validError: string | null;
}

export const Input: FC<IInputProps> = memo((props) => {
  const { Icon, isError, isActive, validError, placeholder, value, type, className, ...anotherProps } = props;

  const ref = useRef<null | HTMLInputElement>(null);
  const placeholderControls = useAnimation();
  const isErrorActive = !!(isError && validError);
  const MemoIcon = Icon && memo(Icon);
  const isIcon = !!MemoIcon;

  const focusOnInput = useCallback(() => {
    if (ref.current) ref.current.focus();
  }, []);

  useEffect(() => {
    if (isActive || value) {
      placeholderControls.start('active');
      return;
    }

    placeholderControls.start('default');
  }, [isActive, isErrorActive, placeholderControls, value]);

  return (
    <div className={classNames(styles.input, { [styles.error]: isErrorActive }, [className])}>
      {isIcon && (
        <div aria-hidden onClick={focusOnInput} className={styles.input_icon}>
          <MemoIcon />
        </div>
      )}

      <input
        className={classNames(styles.input_textfild, { [styles.icon]: isIcon })}
        ref={ref}
        value={value}
        type={type}
        {...anotherProps}
      />

      {isErrorActive && (
        <motion.div
          onClick={focusOnInput}
          className={styles.input_valid_error}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          {validError}
        </motion.div>
      )}

      {placeholder && (
        <motion.div
          onClick={focusOnInput}
          animate={placeholderControls}
          className={classNames(styles.input_placeholder, { [styles.icon]: isIcon })}
          initial="default"
          transition={{ duration: ANIMATION_DURATION }}
          variants={{
            active: isIcon
              ? { translateY: -20, translateX: -20, scale: 0.85 }
              : { translateY: -20, translateX: -10, scale: 0.85 },
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        >
          {placeholder}
        </motion.div>
      )}
    </div>
  );
});
