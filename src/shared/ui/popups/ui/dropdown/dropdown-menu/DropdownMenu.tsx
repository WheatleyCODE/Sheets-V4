import { FC } from 'react';
import type { IDropdownMenuProps } from './DropdownMenu.interface';
import styles from './DropdownMenu.module.scss';

export const DropdownMenu: FC<IDropdownMenuProps> = (props) => {
  const { children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="dropdownMenu" className={styles.menu}>
      {children}
    </div>
  );
};
