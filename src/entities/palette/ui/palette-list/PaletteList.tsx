import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IPaletteListProps } from './PaletteList.interface';
import styles from './PaletteList.module.scss';

export const PaletteList: FC<IPaletteListProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="paletteList" className={classNames(styles.palette_list, {}, [className])}>
      {children}
    </div>
  );
};
