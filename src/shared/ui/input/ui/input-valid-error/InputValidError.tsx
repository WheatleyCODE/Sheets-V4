import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './InputValidError.module.scss';

interface IInputValidErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  validError: string | null;
}

export const InputValidError = forwardRef<HTMLDivElement, IInputValidErrorProps>((props, ref) => {
  const { className, validError, ...anotherProps } = props;

  return (
    <div {...anotherProps} ref={ref} className={classNames(styles.error, {}, [className])}>
      {validError}
    </div>
  );
});

export const MInputValidError = motion(InputValidError);
