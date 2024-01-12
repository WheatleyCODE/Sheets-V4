import { FC } from 'react';
import { MdBorderAll } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { ICellBorderProps } from './CellBorder.interface';
import styles from './CellBorder.module.scss';

export const CellBorder: FC<ICellBorderProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="cellBorder" className={classNames(styles.cell_border, {}, [className])}>
      <Button Icon={MdBorderAll} />
    </div>
  );
};
