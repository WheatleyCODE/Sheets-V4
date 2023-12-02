import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPageMainProps } from './PageMain.interface';
import styles from './PageMain.module.scss';

export const PageMain: FC<IPageMainProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="pageMain" className={classNames(styles.page_main, {}, [className])}>
      {children}
    </div>
  );
};
