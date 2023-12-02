import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IBrowserHeaderProps } from './BrowserHeader.interface';
import styles from './BrowserHeader.module.scss';

export const BrowserHeader: FC<IBrowserHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="browserHeader" className={classNames(styles.browser_header, {}, [className])}>
      BrowserHeader 
    </div>
  );
};
