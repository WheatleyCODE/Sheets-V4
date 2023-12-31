import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside, useGlobalKeydown } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { IDropdownProps } from './Dropdown.interface';
import styles from './Dropdown.module.scss';

export const Dropdown = forwardRef<HTMLDivElement, IDropdownProps>((props, ref) => {
  const { children, className, closePopup, ...anotherProps } = props;
  const main = useRef<HTMLDivElement | null>(null);

  useClickOutside(main, closePopup, ['click', 'contextmenu']);
  useGlobalKeydown({ Escape: [closePopup] });

  return (
    <div {...anotherProps} ref={ref} data-testid="dropdown" className={classNames(styles.dropdown, {}, [className])}>
      <div ref={main}>{children}</div>
    </div>
  );
});

export const MDropdown = motion(Dropdown);
