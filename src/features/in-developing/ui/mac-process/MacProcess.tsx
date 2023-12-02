import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IMacProcessProps } from './MacProcess.interface';
import styles from './MacProcess.module.scss';

export const MacProcess: FC<IMacProcessProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="macProcess" className={classNames(styles.mac_process, {}, [className])}>
      MacProcess 
    </div>
  );
};
