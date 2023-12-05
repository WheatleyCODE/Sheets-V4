import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPageProps } from './Page.interface';
import styles from './Page.module.scss';

export const Page: FC<IPageProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="page" className={classNames(styles.page, {}, [className])}>
      {children}
    </div>
  );
};
