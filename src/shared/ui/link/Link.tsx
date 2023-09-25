import { FC } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';
import { classNames } from 'shared/lib/class-names';
import styles from './Link.module.scss';

interface ILinkProps extends LinkProps {}

export const Link: FC<ILinkProps> = (props) => {
  const { to, className, children, ...anotherProps } = props;
  return (
    <RouterLink to={to} {...anotherProps} className={classNames(styles.link, {}, [className])}>
      {children}
    </RouterLink>
  );
};
