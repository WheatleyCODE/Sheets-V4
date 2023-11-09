import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { classNames } from 'shared/lib/class-names';
import type { IInputPlaceholderProps } from './InputPlaceholder.interface';
import styles from './InputPlaceholder.module.scss';

export const InputPlaceholder = forwardRef<HTMLDivElement, IInputPlaceholderProps>((props, ref) => {
  const { className, placeholder, isIcon, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      data-testid="inputOptionsMenu"
      ref={ref}
      className={classNames(styles.placeholder, { [styles.icon]: !!isIcon }, [className])}
    >
      {placeholder}
    </div>
  );
});

export const MInputPlaceholder = motion(InputPlaceholder);
