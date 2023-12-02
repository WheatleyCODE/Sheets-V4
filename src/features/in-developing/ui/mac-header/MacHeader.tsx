import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IMacHeaderProps } from './MacHeader.interface';
import styles from './MacHeader.module.scss';

export const MacHeader: FC<IMacHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="macHeader" className={classNames(styles.mac_header, {}, [className])}>
      MacHeader 
    </div>
  );
};
