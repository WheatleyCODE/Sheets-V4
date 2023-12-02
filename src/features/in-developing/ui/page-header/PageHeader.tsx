import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPageHeaderProps } from './PageHeader.interface';
import styles from './PageHeader.module.scss';

export const PageHeader: FC<IPageHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="pageHeader" className={classNames(styles.page_header, {}, [className])}>
      PageHeader 
    </div>
  );
};
