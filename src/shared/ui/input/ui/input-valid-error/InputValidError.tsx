import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IInputValidErrorProps } from './InputValidError.interface';
import styles from './InputValidError.module.scss';

export const InputValidError = forwardRef<HTMLDivElement, IInputValidErrorProps>((props, ref) => {
  const { className, validError, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      data-testid="inputValidError"
      ref={ref}
      className={classNames(styles.error, {}, [className])}
    >
      {validError}
    </div>
  );
});

export const MInputValidError = motion(InputValidError);
