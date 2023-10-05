import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './Dropdown.module.scss';

export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  closeDropdown: () => void;
}

export const Dropdown = forwardRef<HTMLDivElement, IDropdownProps>((props, ref) => {
  const { children, className, closeDropdown, ...anotherProps } = props;
  const main = useRef<HTMLDivElement | null>(null);

  useClickOutside(main, closeDropdown, ['click', 'contextmenu']);

  return (
    <div {...anotherProps} ref={ref} className={classNames(styles.dropdown, {}, [className])}>
      <div ref={main}>{children}</div>
    </div>
  );
});

export const MDropdown = motion(Dropdown);
