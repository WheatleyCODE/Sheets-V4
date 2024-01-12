import { FC } from 'react';
import { MdFormatColorFill } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { ICellBgColorProps } from './CellBgColor.interface';
import styles from './CellBgColor.module.scss';

export const CellBgColor: FC<ICellBgColorProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="cellBgColor" className={classNames(styles.cell_bg_color, {}, [className])}>
      <Button Icon={MdFormatColorFill} />
    </div>
  );
};
