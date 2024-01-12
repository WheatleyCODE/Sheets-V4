import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { MdList } from 'react-icons/md';
import { MdOutlineSettings } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsFooterProps } from './SheetsFooter.interface';
import styles from './SheetsFooter.module.scss';
import { Button } from '@/shared/ui/button';

export const SheetsFooter: FC<ISheetsFooterProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="sheetsFooter" className={classNames(styles.sheets_footer, {}, [className])}>
      <Button Icon={MdAdd} />
      <Button Icon={MdList} />
      <Button text="Лист 1" Icon={MdList} />
      <Button Icon={MdOutlineSettings} />
    </div>
  );
});
