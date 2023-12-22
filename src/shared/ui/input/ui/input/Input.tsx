import { MouseEvent, useCallback, useEffect } from 'react';
import { AnimatePresence, useAnimation } from 'framer-motion';
import { ANIMATION_DURATION } from '@/shared/consts/animations/animation';
import { Icon as IconComponent } from '../../../icon';
import { MInputPlaceholder } from '../input-placeholder/InputPlaceholder';
import { MInputValidError } from '../input-valid-error/InputValidError';
import { typedMemo } from '@/shared/lib/react';
import { classNames } from '@/shared/lib/class-names';
import type { IInputProps } from './Input.interface';
import styles from './Input.module.scss';

export const Input = typedMemo(<T extends string>(props: IInputProps) => {
  const { data, eventHandlers, ref, Icon, className, type, isReadonly, placeholder, ...anotherProps } = props;
  const { value, isError, isFocus, validError } = data;

  const placeholderControls = useAnimation();
  const isErrorActive = !!(isError && validError);
  const isIcon = !!Icon;

  const focusOnInput = useCallback((e: MouseEvent<HTMLInputElement>) => {
    if (ref?.current) ref.current.focus();
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!ref?.current) return;

    if (isFocus) ref.current.focus();
    if (!isFocus) ref.current.blur();
  }, [isFocus]);

  useEffect(() => {
    if (isFocus || value) {
      placeholderControls.start('active');
      return;
    }

    placeholderControls.start('default');
  }, [isFocus, isErrorActive, placeholderControls, value]);

  const placeholderAnimation = { translateY: -20, translateX: isIcon ? -20 : -10, scale: 0.85 };

  return (
    <div
      className={classNames(styles.input, { [styles.error]: isErrorActive, [styles.readonly]: isReadonly }, [
        className,
      ])}
    >
      {isIcon && (
        <div aria-hidden data-testid="input-icon" onMouseDown={focusOnInput} className={styles.input_icon}>
          <IconComponent Icon={Icon} />
        </div>
      )}

      <input
        className={classNames(styles.input_textfild, { [styles.icon]: isIcon })}
        data-testid="input"
        ref={ref}
        value={value}
        type={type}
        {...anotherProps}
        {...eventHandlers}
        disabled={isReadonly}
      />

      {placeholder && (
        <MInputPlaceholder
          placeholder={placeholder}
          isIcon={isIcon}
          onMouseDown={focusOnInput}
          animate={placeholderControls}
          initial="default"
          transition={{ duration: ANIMATION_DURATION }}
          variants={{
            active: placeholderAnimation,
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        />
      )}

      <AnimatePresence>
        {isErrorActive && (
          <MInputValidError
            validError={validError}
            onClick={focusOnInput}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
