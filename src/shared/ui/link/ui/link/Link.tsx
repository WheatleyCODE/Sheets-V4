import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { classNames } from 'shared/lib/class-names';
import type { ILinkProps } from './Link.interface';
import styles from './Link.module.scss';

export const Link: FC<ILinkProps> = memo((props) => {
  const { to, className, children, ...anotherProps } = props;

  return (
    <RouterLink to={to} {...anotherProps} data-testid="link" className={classNames(styles.link, {}, [className])}>
      {children}
    </RouterLink>
  );
});
