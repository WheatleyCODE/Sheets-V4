import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { intoIter } from 'shared/lib/iterators';
import { Icon as IconComponent } from 'shared/ui/icon';
import { IInputOptionsMenuItem, InputOptionsMenuItem } from '../input-options-menu-item/InputOptionsMenuItem';
import { MInputOptionsMenu } from '../input-options-menu/InputOptionsMenu';
import { MInputPlaceholder } from '../input-placeholder/InputPlaceholder';
import { MInputValidError } from '../input-valid-error/InputValidError';
import { DefaultItems, defaultItems } from '../../model/consts/numbers';
import { classNames } from 'shared/lib/class-names';
import styles from './Input.module.scss';

export interface IInputOptions {
  items: Iterable<IInputOptionsMenuItem> | DefaultItems;
  changeValue: (a?: any) => void;
  maxItems?: number;
  isSearch?: boolean;
  isForbidInput?: boolean;
}

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  Icon?: IconType;
  type: string;
  isError: boolean;
  isActive: boolean;
  validError: string | null;
  isFocus?: boolean;
  isTouched?: boolean;
  isReadonly?: boolean;
  options?: IInputOptions;
}

export const Input: FC<IInputProps> = memo((props) => {
  const {
    Icon,
    isError,
    isActive,
    validError,
    placeholder,
    value,
    type,
    className,
    onChange,
    isFocus,
    isReadonly = false,
    options,
    ...anotherProps
  } = props;

  const ref = useRef<null | HTMLInputElement>(null);
  const placeholderControls = useAnimation();
  const isErrorActive = !!(isError && validError);
  const isIcon = !!Icon;

  const isOptions = options != null;
  const isDefaultOptions = isOptions && typeof options.items === 'string';

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

  const getChangeValue = (text: any) => () => {
    console.log('text', text);
    options?.changeValue(text);
  };

  const items =
    isOptions &&
    intoIter<IInputOptionsMenuItem>(isDefaultOptions ? defaultItems[options.items as DefaultItems] : options.items)
      .filter((item) => !options.isSearch || item.text.includes(value))
      .map((item) => <InputOptionsMenuItem key={item.text} onClick={getChangeValue(item.text)} item={item} />)
      .toArray();

  const placeholderAnimation = { translateY: -20, translateX: isIcon ? -20 : -10, scale: 0.85 };

  return (
    <div
      className={classNames(styles.input, { [styles.error]: isErrorActive, [styles.readonly]: isReadonly }, [
        className,
      ])}
    >
      {isIcon && (
        <div aria-hidden data-testid="input-icon" onClick={focusOnInput} className={styles.input_icon}>
          <IconComponent Icon={Icon} />
        </div>
      )}

      <input
        className={classNames(styles.input_textfild, { [styles.icon]: isIcon })}
        data-testid="input"
        ref={ref}
        value={value}
        type={type}
        disabled={isReadonly}
        onChange={isReadonly || !!options?.isForbidInput ? () => {} : onChange}
        {...anotherProps}
      />

      {placeholder && (
        <MInputPlaceholder
          placeholder={placeholder}
          isIcon={isIcon}
          onClick={focusOnInput}
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

        {isOptions && isFocus && !isReadonly && !!items && items.length > 0 && (
          <MInputOptionsMenu
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            maxItems={options.maxItems}
          >
            {items}
          </MInputOptionsMenu>
        )}
      </AnimatePresence>
    </div>
  );
});
