import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { classNames } from 'shared/lib/class-names';
import styles from './InputPlaceholder.module.scss';

interface IInputPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  isIcon?: boolean;
}

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
