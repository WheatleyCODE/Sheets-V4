import { FC } from 'react';
import styles from './DropdownMenu.module.scss';

interface IDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenu: FC<IDropdownMenuProps> = (props) => {
  const { children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="dropdownMenu" className={styles.menu}>
      {children}
    </div>
  );
};
